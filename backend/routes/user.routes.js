const router = require('express').Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth')
// Création du router express

// http://localhost:7000/api/user/
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', auth, userCtrl.getOneUser);
router.get('/', auth, userCtrl.getAllUsers);

module.exports = router;