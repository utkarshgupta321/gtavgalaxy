const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
const { isAdmin } = require('../middleware/auth');

router.get('/', isAdmin, admin.dashboard);
router.get('/delete-user/:id', isAdmin, admin.deleteUser);
router.get('/delete-thread/:id', isAdmin, admin.deleteThread);

module.exports = router;
