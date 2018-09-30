'use strict';

var config = require('../../config');
// var bodyParser = require("body-parser");
var nodeMailer = require('nodemailer');
var ejs = require('ejs');
var fs = require('fs');

module.exports = function(user) {
  // Create User
  user.afterRemote('create', function(ctx, instance, next) {
    console.log('>Creating new user');
    sendEmailWelcome(instance);
    next();
  });

  // User before save
  user.beforeSave = function(next, modelInstance) {
    console.log('User before save');
    next();
  };

  // Send password reset link when requested
  user.on('resetPasswordRequest', function(info) {
    // console.log('Request token to reset password: ', info.email);
    // var url =  config.host + ':' + config.port + '/reset-password?access_token=' + info.accessToken.id;
    // var options = JSON.parse(JSON.stringify(config.restorePasswordOptions));
    // options.resetPasswordHref = url;
    // sendRestorePassword(info);
  });

  // render UI page after password reset
  user.afterRemote('setPassword', function(context, company, next) {
    // console.log('Set New Password');
    // Company.findById(context.req.accessToken.userId)
    //   .then(company => {
    //     sendSuccessfullyRestorePassword(company);
    //     next();
    //   })
    //   .catch(err => {
    //     next(err);
    //   });
  });
};

function sendEmailWelcome(instance) {
  console.log('>Preparing welcome email to:', instance.username);

  let transporter = nodeMailer.createTransport(config.email);
  let templateString = fs.readFileSync(
    './server/templates/welcome-email.ejs',
    'utf-8'
  );

  let html = ejs.render(templateString, {
    email: instance.email,
    username: instance.username,
    domaine: 'http://' + config.host + ':' + config.port + '/explorer',
  });

  let mailOptions = {
    from: '"World" <noreply@world.com>',
    to: instance.email,
    subject: 'Welcome new User',
    html: html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return console.log('>Error sending welcome email:', error);
    console.log('>Sending welcome email to:', instance.email);
  });
}

function sendRestorePassword(info) {
  // console.log('****SendRestorePassword****');
  // let transporter = nodeMailer.createTransport(dataSourceConfig.emails.transports[0]);
  // let templateString = fs.readFileSync("./server/views/restorePasswordRequest.ejs", "utf-8");
  // var url =  'http://' + config.publicAdd + ':' + config.port + '/reset-password?access_token=' + info.accessToken.id;
  // let html = ejs.render(templateString, {
  //     link:url,
  // });
  // let mailOptions = {
  //     from: '"World" <noreply@world.com>',
  //     to: info.email,
  //     subject: 'Recuperar contraseña',
  //     html: html
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) return console.log(error);
  //     console.log('>Sending email to: ', mailOptions.to);
  // });
}

function sendSuccessfullyRestorePassword(user) {
  // console.log('****sendSuccessfullyRestorePassword****');
  // let transporter = nodeMailer.createTransport(dataSourceConfig.emails.transports[0]);
  // let templateString = fs.readFileSync("./server/views/successfullyRestorePassword.ejs", "utf-8");
  // let html = ejs.render(templateString, {
  //   domaine:'http://' + config.host + ':' + config.port + '/login'
  // });
  // let mailOptions = {
  //     from: '"World" <noreply@world.com>',
  //     to: user.email,
  //     subject: 'Contraseña cambiada',
  //     html: html
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //     console.log('>Sending email to: ', mailOptions.to);
  //     if (error) {
  //         return console.log(error);
  //     }
  // });
}
