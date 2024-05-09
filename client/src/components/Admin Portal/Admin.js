import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase/firebase';
import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Select,
  Input,
} from '@chakra-ui/react';
import { collection, onSnapshot, updateDoc, getDoc, doc, deleteDoc } from 'firebase/firestore';
import { useCurrentUserDetails, deleteAdminFromAuth } from '../../hooks/useAuth';

import './Admin.css';

const Admin = () => {
  const currentUser = useCurrentUserDetails()
  const [admins, setAdmins] = useState([]);
  const inactiveColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'Users'), (snapshot) => {
      const adminsData = snapshot.docs.map(doc => ({
        id: doc.id,
        editing: false, // Track editing state for each admin
        ...doc.data()
      }));
      setAdmins(adminsData);
    });

    return () => unsubscribe();
  }, []);

  const handleEdit = async (adminId) => {
    // If currently editing, save the changes to Firestore
    if (admins.find(admin => admin.id === adminId).editing) {
      const adminRef = doc(db, 'Users', adminId);
      const newUsername = admins.find(admin => admin.id === adminId).username;

      try {
        await updateDoc(adminRef, { username: newUsername });
        console.log("Username updated successfully!");
      } catch (error) {
        console.error("Error updating username: ", error);
      }
    }

    // Toggle editing state
    setAdmins(admins.map(admin => {
      if (admin.id === adminId) {
        return { ...admin, editing: !admin.editing };
      }
      return admin;
    }));
  };

  const handleChangeRole = (adminId, newRole) => {
    const adminRef = doc(db, 'Users', adminId);

    updateDoc(adminRef, {
      role: newRole
    }).then(() => {
      console.log("Role updated successfully!");
      setAdmins(admins.map(admin => {
        if (admin.id === adminId) {
          return { ...admin, role: newRole, editing: false }; // Update role and exit editing mode
        }
        return admin;
      }));
    }).catch(error => {
      console.error("Error updating role: ", error);
    });
  };

  const handleDeactivate = async (adminId) => {
    const adminRef = doc(db, 'Users', adminId);
    const adminDoc = await getDoc(adminRef);

    if (adminDoc.exists()) {
      const updatedIsActive = !adminDoc.data().isActive;
      updateDoc(adminRef, {
        isActive: updatedIsActive
      }).then(() => {
        console.log("Document successfully updated!");
        setAdmins(admins.map(admin => {
          if (admin.id === adminId) {
            return { ...admin, isActive: updatedIsActive };
          }
          return admin;
        }));
      }).catch(error => {
        console.error("Error updating document: ", error);
      });
    } else {
      console.log("No such document!");
    }
  };

  const handleDelete = async (adminId) => {
    // Check if the current user is an admin
    if (currentUser.role !== 'admin') {
      alert('Only admins can delete users.');
      return;
    }
  
    // Show a confirmation dialog before deletion
    const isConfirmed = window.confirm("Are you sure you want to delete this user? This action cannot be undone.");
    if (!isConfirmed) {
      console.log("User deletion canceled.");
      return; // Stop the deletion process if the admin cancels
    }
  
    // Proceed with deletion if the user is an admin and confirmation was given
    try {
      // Assume deleteAdminFromAuth is an async function that deletes the user from Firebase Authentication
      await deleteAdminFromAuth(adminId);
      // Delete the user's document from Firestore only after successful authentication deletion
      await deleteDoc(doc(db, 'Users', adminId));
      console.log("User successfully deleted from Firestore and Authentication");
      setAdmins(admins.filter(admin => admin.id !== adminId));
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert(`Error deleting user: ${error.message}`);
    }
  };
  
  

  return (
    <div className="admin-container">
      <h1 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}> </h1>  
      <h1 style={{ fontWeight: 'bold', fontSize: '35px', marginBottom: '20px' }}>Admin Portal</h1>
      <Table className="admin-table">
        <Thead>
          <Tr>
            <Th>Username</Th>
            <Th>Role</Th>
            <Th>Email</Th>
            <Th>Deactivate Account</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {admins.map((admin) => (
            <Tr key={admin.id} className={!admin.isActive ? 'inactive' : ''} bg={!admin.isActive ? inactiveColor : undefined}>
              <Td>
                {admin.editing ? (
                  <Input
                    value={admin.username}
                    onChange={(e) => setAdmins(admins.map(a => a.id === admin.id ? { ...a, username: e.target.value } : a))}
                  />
                ) : (
                  admin.username
                )}
              </Td>
              <Td>
                {admin.editing ? (
                  <Select defaultValue={admin.role} onChange={(e) => handleChangeRole(admin.id, e.target.value)} backgroundColor="white" color="black">
                    <option value="guest">guest</option>
                    <option value="child">child</option>
                    <option value="teacher">teacher</option>
                    <option value="admin">admin</option>
                  </Select>
                ) : (
                  admin.role
                )}
              </Td>
              <Td>{admin.email}</Td>
              <Td>
                <Button colorScheme={admin.isActive ? 'red' : 'green'} onClick={() => handleDeactivate(admin.id)}>
                  {admin.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleEdit(admin.id)}>
                  {admin.editing ? 'Save' : 'Edit'}
                </Button>
              </Td>
              <Td>
                <Button colorScheme="red" onClick={() => handleDelete(admin.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};




export default Admin;
