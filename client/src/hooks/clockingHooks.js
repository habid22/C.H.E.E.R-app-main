import firebase from 'firebase/compat/app';
import { getFirestore, doc, setDoc, orderBy,updateDoc, getDoc, collection, query, where, getDocs, Timestamp, addDoc, deleteDoc } from "firebase/firestore";
import moment from 'moment-timezone';
import app from '../Firebase/firebase';
import { useFetchUserDetails } from "./useAuth";

const db = getFirestore(app);

// Punch in function
const punchIn = async (userId, name) => {
  
  try {
    const now = moment().tz("America/Toronto").toDate();
    const docId = `${moment(now).format('YYYYMMDD_HHmm')}_${userId}`;
    const shiftRef = doc(db, "Shifts", docId);

    await setDoc(shiftRef, {
      userId: userId,
      name: name,
      punchIn: now, // This is now in Toronto time
      isComplete: false
    });

    await updateDoc(doc(db, "Users", userId), {
      currentShiftId: docId,
      isPunchedIn: true
    });

    console.log("Punch in recorded with ID: ", docId);
  } catch (e) {
    console.error("Error in punch-in process: ", e);
  }
};

// Punch out function
const punchOut = async (userId) => {
  try {
    const userRef = doc(db, "Users", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists() && userDoc.data().isPunchedIn) {
      const shiftRef = doc(db, "Shifts", userDoc.data().currentShiftId);
  
      const punchOutTime = moment().tz("America/Toronto").toDate();
      await updateDoc(shiftRef, {
        punchOut: punchOutTime,
        isComplete: true
      });

      // Fetch the updated document to get the exact punchOut time
      const updatedShiftDoc = await getDoc(shiftRef);
      const punchInTimestamp = moment(updatedShiftDoc.data().punchIn.toDate()).tz("America/Toronto");
      const punchOutTimestamp = moment(updatedShiftDoc.data().punchOut.toDate()).tz("America/Toronto");

      // Calculate duration
      const durationMs = punchOutTimestamp.diff(punchInTimestamp);
      const durationHrs = Math.floor(durationMs / 3600000); // Hours
      const durationMin = Math.floor((durationMs % 3600000) / 60000); // Minutes

      console.log(`Shift Duration: ${durationHrs} hours, ${durationMin} minutes`);

      // Reset user's punch-in status
      await updateDoc(userRef, {
        isPunchedIn: false,
        currentShiftId: null
      });
    } else {
      console.error("No active shift to punch out from for user ID: ", userId);
    }
  } catch (e) {
    console.error("Error in punch-out process: ", e);
  }
};

const fetchShiftsForMonth = async (year, month) => {
  // Firestore uses Timestamps, so we create Dates that we can convert to Timestamps
  const startDate = moment.tz([year, month], "America/Toronto").startOf('month').toDate();
  const endDate = moment.tz([year, month], "America/Toronto").endOf('month').toDate();

  const startTimestamp = Timestamp.fromDate(startDate); // Use Timestamp directly
  const endTimestamp = Timestamp.fromDate(endDate);

  console.log(`Fetching shifts between ${startTimestamp.toDate()} and ${endTimestamp.toDate()}`);

  const shiftsQuery = query(
    collection(db, "Shifts"),
    where("punchIn", ">=", startTimestamp),
    where("punchIn", "<=", endTimestamp)
  );

  // Execute the query
  const querySnapshot = await getDocs(shiftsQuery);
  let shifts = [];
  querySnapshot.forEach((doc) => {
    const shiftData = doc.data();
    // Convert the Firestore Timestamps to Date objects for easier handling in JS
    shiftData.punchIn = shiftData.punchIn.toDate();
    shiftData.punchOut = shiftData.punchOut ? shiftData.punchOut.toDate() : null;
    shifts.push(shiftData);
  });

  return shifts;
};

const getTeachers = async () => {
  const teachers = [];
  const querySnapshot = await getDocs(query(collection(db, "Users"), where("role", "==", "teacher")));
  querySnapshot.forEach((doc) => {
    teachers.push({ id: doc.id, ...doc.data() });
  });
  return teachers;
};

const fetchClockingRecords = async (userId, year, month) => {
  const startDate = moment.tz([year, month], "America/Toronto").startOf('month').toDate();
  const endDate = moment.tz([year, month], "America/Toronto").endOf('month').toDate();

  const startTimestamp = Timestamp.fromDate(startDate);
  const endTimestamp = Timestamp.fromDate(endDate);

  const records = [];
  const querySnapshot = await getDocs(query(
    collection(db, "Shifts"),
    where("userId", "==", userId),
    where("punchIn", ">=", startTimestamp),
    where("punchIn", "<=", endTimestamp),
    orderBy("punchIn")
  ));

  querySnapshot.forEach((doc) => {
    records.push({ id: doc.id, ...doc.data() });
  });

  return records;
};

const updateRecord = async (recordId, updatedFields) => {
  const recordRef = doc(db, "Shifts", recordId);

  // Check if the updated fields contain punchIn or punchOut and convert them to Timestamp
  if (updatedFields.punchIn) {
    updatedFields.punchIn = Timestamp.fromDate(new Date(updatedFields.punchIn));
  }
  if (updatedFields.punchOut) {
    updatedFields.punchOut = Timestamp.fromDate(new Date(updatedFields.punchOut));
  }

  await updateDoc(recordRef, updatedFields);
};


const addRecord = async (record) => {
  const recordRef = doc(collection(db, "Shifts"), record.id);
  await setDoc(recordRef, { ...record });
};


const deleteRecord = async (recordId) => {
  const recordRef = doc(db, "Shifts", recordId);
  await deleteDoc(recordRef);
};



export { punchIn, punchOut, fetchShiftsForMonth, addRecord, deleteRecord, updateRecord, fetchClockingRecords, getTeachers };
