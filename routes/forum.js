const express = require('express');
const router = express.Router();
const forum = require('../controllers/forumController');
const { isAuth } = require('../middleware/auth');

router.get('/', isAuth, forum.index);
router.post('/new', isAuth, forum.createThread);
router.get('/thread/:id', isAuth, forum.viewThread);
router.post('/thread/:id/post', isAuth, forum.addPost);

module.exports = router;
