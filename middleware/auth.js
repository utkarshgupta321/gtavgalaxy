exports.isAuth = (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    res.redirect('/login');
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.is_admin) {
      return next();
    }
    res.redirect('/');
  };
  