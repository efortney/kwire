const passport = require('passport');

/**
 * Routing for authentication and authorization
 */
module.exports = (app) => {
  app.get('/api/currentuser', (req, res) => {
    req.user ? res.json(req.user) : res.json({});
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get(
    '/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    },
  );
};
