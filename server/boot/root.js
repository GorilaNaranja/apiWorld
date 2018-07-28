'use strict';

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};

// app.post('/login', function(req, res) {
//   User.login({
//     email: req.body.email,
//     password: req.body.password
//   }, 'user', function(err, token) {
//
//     if (err) {
//       res.render('response', { //render view named 'response.ejs'
//         title: 'Login failed',
//         content: err,
//         redirectTo: '/',
//         redirectToLinkText: 'Try again'
//       });
//       return;
//     }
//
//     res.render('home', { //login user and render 'home' view
//       email: req.body.email,
//       accessToken: token.id
//     });
//   });
// });
//
//
// app.get('/logout', function(req, res, next) {
//   if (!req.accessToken) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
//   User.logout(req.accessToken.id, function(err) {
//     if (err) return next(err);
//     res.redirect('/'); //on successful logout, redirect
//   });
// });
