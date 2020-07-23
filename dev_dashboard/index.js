/**
 * Index page for the development dashboard.
 */

module.exports = app => {

  app.get('/api/health', (req, res) => {
    res.send(200);
  });

}