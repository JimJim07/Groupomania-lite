const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth')

// http://localhost:7000/api/user/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// User
router.get('/:id', auth, userCtrl.getOneUser);
// Admin
router.get('/admin/:id', auth, userCtrl.getOneAdmin);

module.exports = router;