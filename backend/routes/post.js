const router = require('express').Router();
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// http://localhost:7000/api/post/
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.delete('/:id', auth, postCtrl.deleteOnePost);
router.delete('/', auth, postCtrl.deleteAllPosts);

// Like Unlike
router.patch('/like/:id', auth, postCtrl.likePost);
router.patch('/unlike/:id', auth, postCtrl.unlikePost);

module.exports = router;