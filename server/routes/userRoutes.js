const express = require('express');
const { deleteUser } = require('../controllers/userControllers');
const router = express.Router();


router.delete('/deleteUser', deleteUser);

module.exports = router;