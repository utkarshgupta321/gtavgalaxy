// server.js
require('dotenv').config();
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const helmet = require('helmet');
const path = require('path');
const app = express();

// Middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Prevent running with bad configuration
if (!process.env.SESSION_SECRET) {
  console.error("SESSION_SECRET is not set!");
  process.exit(1); 
}

// Session setup
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Flash
app.use(flash());


// Views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Default route to serve index.html from public/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.htm'));
});

// Routes
app.use('/', require('./routes/auth'));
app.use('/forum', require('./routes/forum'));

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

