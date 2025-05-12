const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  sendRequest,
  getRequests,
  acceptRequest,
  rejectRequest,
  getFriends
} = require('../controllers/friendRequestController');

router.post('/send', auth, sendRequest);
router.get('/received', auth, getRequests);
router.put('/accept/:requestId', auth, acceptRequest);
router.put('/reject/:requestId', auth, rejectRequest);
router.get('/list', auth, getFriends);

module.exports = router;
