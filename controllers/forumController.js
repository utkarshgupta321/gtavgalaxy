const db = require('../models/db');

exports.index = async (req, res) => {
  const [threads] = await db.query('SELECT t.*, u.username FROM threads t JOIN users u ON t.user_id = u.id');
  res.render('forum', { threads, user: req.session.user });
};

exports.createThread = async (req, res) => {
  const { title, content } = req.body;
  await db.query('INSERT INTO threads (user_id, title, content) VALUES (?, ?, ?)', [req.session.user.id, title, content]);
  res.redirect('/forum');
};

exports.viewThread = async (req, res) => {
  const { id } = req.params;
  const [[thread]] = await db.query('SELECT * FROM threads WHERE id = ?', [id]);
  const [posts] = await db.query('SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE thread_id = ?', [id]);
  res.render('thread', { thread, posts });
};

exports.addPost = async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  await db.query('INSERT INTO posts (thread_id, user_id, content) VALUES (?, ?, ?)', [id, req.session.user.id, content]);
  res.redirect(`/forum/thread/${id}`);
};
