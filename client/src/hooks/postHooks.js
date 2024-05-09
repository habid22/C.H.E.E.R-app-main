import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import app from '../Firebase/firebase'; // Adjust the import path as needed

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Function to upload files to Firebase Storage and return their download URLs
const uploadFiles = async (files, postID) => {
  let urls = {};
  let attachments = [];

  for (const file of files) {
    if (!file.name || !postID) {
      console.error('Invalid file object or postID:', file, postID);
      continue;
    }

    try {
      const storageRef = ref(storage, `posts/${postID}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      urls[file.name] = downloadURL; // For Firestore
      attachments.push({ filename: file.name, path: downloadURL }); // For Email
    } catch (error) {
      console.error(`Error uploading file ${file.name}:`, error);
    }
  }

  return { urls, attachments }; // Return an object with both properties
};


// Function to create a post
export const createPost = async ({ heading, content, images, videos, audios, documents, sendEmail }) => {
  const baseUrl = "https://my-api-service-qokrqcvrpa-uc.a.run.app/";

  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User is not authenticated.");

    const userRef = doc(db, "Users", currentUser.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists() || userDoc.data().role !== 'admin') {
      throw new Error("Only users with an admin role can create posts.");
    }

    const now = new Date();
    const postID = `${now.toLocaleDateString().replace(/\//g, '')}_${now.toLocaleTimeString().replace(/:/g, '')}_${heading.replace(/\s+/g, '_')}`;

    const { urls: imageUrls, attachments: imageAttachments } = await uploadFiles(images, postID);
    const { urls: videoUrls, attachments: videoAttachments } = await uploadFiles(videos, postID);
    const { urls: audioUrls, attachments: audioAttachments } = await uploadFiles(audios, postID);
    const { urls: documentUrls, attachments: documentAttachments } = await uploadFiles(documents, postID);

    const mediaUrls = { ...imageUrls, ...videoUrls, ...audioUrls, ...documentUrls };
    const attachments = [...imageAttachments, ...videoAttachments, ...audioAttachments, ...documentAttachments];

    const postRef = doc(db, "Newsletter", postID);
    await setDoc(postRef, {
      heading,
      content,
      mediaUrls,
      date: now
    });

    if (sendEmail) {
      const subscribers = await fetchSubscribers(db); // Ensure fetchSubscribers is defined and uses the db instance
      for (const subscriberEmail of subscribers) {
        const emailContent = `${content}`;

        const emailData = {
          email: subscriberEmail,
          subject: heading,
          message: emailContent,
          attachments: attachments
        };

        const response = await fetch(`${baseUrl}/api/email/sendEmail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        if (!response.ok) {
          console.error(`Failed to send email to ${subscriberEmail}: ${response.statusText}`);
        }
      }
    }

    return { id: postRef.id, mediaUrls }; // Return the post ID and media URLs
  } catch (error) {
    console.error("Error creating post: ", error);
    throw error;
  }
};

const fetchSubscribers = async (db) => {
  const subscriberCollectionRef = collection(db, 'subscribers');
  const snapshot = await getDocs(subscriberCollectionRef);
  return snapshot.docs.map(doc => doc.data().email);
};


export const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "Newsletter"));
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return posts;
};

