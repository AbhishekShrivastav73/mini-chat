const express = require('express');
const router = express.Router();
const { register, login, getUser } = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getUser);

module.exports = router;
