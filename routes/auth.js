const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

// Public auth routes
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

// Password reset
router.get('/forgot', (req, res) => res.render('forgot'));
router.post('/forgot', auth.resetRequest);
router.get('/reset/:token', auth.resetForm);
router.post('/reset', auth.resetSubmit);

module.exports = router;
