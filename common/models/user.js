'use strict';

var config = require('../../server/config.json');

module.exports = function(User) {


  //send verification email after registration
  User.afterRemote('create', function(context, userInstance, next) {
    console.log('> Creating User ...');

    var options = {
      type: 'email',
      to: userInstance.email,
      from: 'noreply@loopback.com',
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/templates/example.ejs'),
      redirect: '/verified',
      user: user
    };

    userInstance.verify(options, function(err, response, next) {
      if (err) return next(err);

      console.log('> Verification email sent:', response);

      context.res.render('response', {
        title: 'Signed up successfully',
        content: 'Please check your email and click on the verification link ' -
            'before logging in.',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });

  User.observe('before save', function(ctx, next) {
  console.log('> User before save');
  });

  User.observe('after save', function(ctx, next) {
     console.log('> User after save');
  });


};
