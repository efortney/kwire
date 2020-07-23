const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/**',
    proxy({
      target: 'http://localhost:8080',
    })
  );
  app.use(
    '/auth/google',
    proxy({
      target: 'http://localhost:8080',
    })
  );
  app.use(
    '/google/callback',
    proxy({
      target: 'http://localhost:8080',
    })
  );
};