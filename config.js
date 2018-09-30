'use strict';

module.exports = {
  email: {
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 465,
    secure: process.env.EMAIL_SECURE || false,
    auth: {
      user: process.env.EMAIL_AUTH_USER || 'myemail@email.com',
      pass: process.env.EMAIL_AUTH_PASSWORD || 'myemailpassword',
    },
  },
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
};
