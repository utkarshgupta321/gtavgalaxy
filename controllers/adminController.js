const db = require('../models/db');

exports.dashboard = async (req, res) => {
  const [users] = await db.query('SELECT * FROM users');
  const [threads] = await db.query('SELECT * FROM threads');
  res.render('admin', { users, threads });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM users WHERE id = ?', [id]);
  res.redirect('/admin');
};

exports.deleteThread = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM threads WHERE id = ?', [id]);
  res.redirect('/admin');
};
