const express = require('express');
const { listAlbums, getAlbumImages } = require('../controllers/albumControllers');
const router = express.Router();


router.get('/listAlbums', listAlbums);
router.get('/getAlbumImages/:albumId', getAlbumImages);

module.exports = router;