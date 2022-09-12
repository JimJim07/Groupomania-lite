const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth')

// http://localhost:7000/api/user/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);

// A suprrimer *****************************
router.get('/', userCtrl.getAllUsers);
router.delete('/', userCtrl.deleteAllUsers);
// A suprrimer *****************************

module.exports = router;