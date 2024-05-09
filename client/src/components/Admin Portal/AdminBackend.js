// AdminBackEnd.js

const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'YOUR_FIREBASE_DATABASE_URL'
});

const db = admin.firestore();
const app = express();
const port = 3001;

// Middleware to verify Firebase ID token
const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying ID token:', error);
    return res.status(401).json({ error: 'Unauthorized' });
  }
};


// Create a new user
app.post('/users', verifyToken, async (req, res) => {
    try {
      const { username, email, isActive } = req.body;
      const newUserRef = await db.collection('users').add({ username, email, isActive });
      return res.status(201).json({ id: newUserRef.id, username, email, isActive });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Get all users
app.get('/users', verifyToken, async (req, res) => {
    try {
      const usersSnapshot = await db.collection('users').get();
      const users = [];
      usersSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return res.status(200).json({ users });
    } catch (error) {
      console.error('Error getting users:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Update a user
app.put('/users/:userId', verifyToken, async (req, res) => {
    try {
      const { username, email, isActive } = req.body;
      const userId = req.params.userId;
      await db.collection('users').doc(userId).update({ username, email, isActive });
      return res.status(200).json({ id: userId, username, email, isActive });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Delete a user
app.delete('/users/:userId', verifyToken, async (req, res) => {
    try {
      const userId = req.params.userId;
      await db.collection('users').doc(userId).delete();
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Toggle user's active status
app.put('/users/:userId/toggle-active', verifyToken, async (req, res) => {
    try {
      const userId = req.params.userId;
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: 'User not found' });
      }
      const isActive = !userDoc.data().isActive;
      await userRef.update({ isActive });
      return res.status(200).json({ id: userId, isActive });
    } catch (error) {
      console.error('Error toggling user active status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });