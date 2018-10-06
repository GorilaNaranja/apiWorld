'use strict';

module.exports = function(app) {
  var User = app.models.User;

  // Show password reset form
  app.get('/reset-password', function(req, res, next) {
    console.log('Reset-password');
    if (!req.accessToken) return res.sendStatus(401);
    res.render('restorePasswordForm', {
      urlSetNewPassword:
        '/api/users/reset-password?access_token=' + req.accessToken.id,
    });
  });
};
