const admin = require('firebase-admin');

// Path to your Firebase Admin SDK JSON file
const serviceAccount = require('../se3350-group-18-415915-firebase-adminsdk-ikb05-b03b5b90c6.json');

// Initialize Firebase Admin if it's not already initialized
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

exports.deleteUser = async (req, res) => {
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).send({ message: 'Missing user UID.' });
  }

  try {
    await admin.auth().deleteUser(uid);
    console.log(`Successfully deleted user with UID: ${uid}`);
    return res.send({ message: `Successfully deleted user with UID: ${uid}` });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).send({ message: 'Failed to delete user', error: error.message });
  }
};
