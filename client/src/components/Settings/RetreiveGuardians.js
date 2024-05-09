// Guardians back-end component to retrieve guardians based on user's role and email

const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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

// Route to get guardians based on user's role and email
app.get('/guardians', verifyToken, async (req, res) => {
    try {
      const userEmail = req.user.email;
      const userRecord = await admin.auth().getUserByEmail(userEmail);
      const userRoles = userRecord.customClaims.roles || [];
  
      // Check if user has guardian role
      if (userRoles.includes('guardian')) {
        // Get guardian information from Firestore based on user's email
        const guardiansSnapshot = await admin.firestore().collection('guardians').where('email', '==', userEmail).get();
        const guardians = [];
        guardiansSnapshot.forEach((doc) => {
          guardians.push(doc.data());
        });
        
        return res.status(200).json({ guardians });
      } else {
        return res.status(403).json({ error: 'Forbidden' });
      }
    } catch (error) {
      console.error('Error getting guardians:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


