const router = require('express').Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')

// http://localhost:7000/api/user/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
// User
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);

module.exports = router;