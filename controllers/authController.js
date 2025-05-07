const bcrypt = require('bcrypt');
const db = require('../models/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashed]);
  res.redirect('/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) return res.redirect('/login');
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    req.session.user = user;
    res.redirect('/forum');
  } else {
    res.redirect('/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

exports.resetRequest = async (req, res) => {
  const { email } = req.body;
  const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!user) return res.redirect('/forgot');
  const token = crypto.randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // 1 hour
  await db.query('INSERT INTO reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [user.id, token, expires]);

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset',
    html: `<a href="${process.env.BASE_URL}/reset/${token}">Reset Password</a>`
  });

  res.send("Check your email for the reset link.");
};

exports.resetForm = async (req, res) => {
  const token = req.params.token;
  const [row] = await db.query('SELECT * FROM reset_tokens WHERE token = ? AND expires_at > NOW()', [token]);
  if (!row) return res.send("Invalid or expired token");
  res.render('reset', { token });
};

exports.resetSubmit = async (req, res) => {
  const { token, password } = req.body;
  const [row] = await db.query('SELECT * FROM reset_tokens WHERE token = ?', [token]);
  if (!row) return res.send("Invalid token");

  const hashed = await bcrypt.hash(password, 10);
  await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, row.user_id]);
  await db.query('DELETE FROM reset_tokens WHERE token = ?', [token]);
  res.send("Password updated");
};
