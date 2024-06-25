const express = require('express');
const router = express.Router();
const { GetTrack, AddTrack } = require('../controllers/TrackController');
// const validateToken = require('../middleware/validateTokenHandler');

// router.use(validateToken)
router.get('/', GetTrack)
router.post('/add', AddTrack)


module.exports = router;