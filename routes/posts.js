const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/posts', auth, postsController.createPost);
router.get('/posts', auth, postsController.getPosts);
router.get('/posts/foro/:id_foro', auth, postsController.getPostByForo);
router.get('/posts/:id', auth, postsController.getPostById);
router.put('/posts/:id', auth, postsController.updatePost);
router.delete('/posts/:id', auth, postsController.deletePost);

module.exports = router;