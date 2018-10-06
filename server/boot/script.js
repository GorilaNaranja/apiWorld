'use strict';

var app = require('../../server/server');
var User = app.models.User;
var Role = app.models.Role;

User.create(
  [
    {username: 'Felipe', email: 'felipe@test.com', password: '123456'},
    {username: 'Diego', email: 'diego@test.com', password: '123456'},
    {username: 'Alberto', email: 'alberto@test.com', password: '123456'},
  ],
  function(err, users) {
    if (err) return;

    Role.create(
      {
        name: 'admin',
      },
      function(err, role) {
        if (err) return;
        console.log(role);

        // Make Bob an admin
        role.principals.create(
          {
            principalType: RoleMapping.USER,
            principalId: users[2].id,
          },
          function(err, principal) {
            if (err) return;
            console.log(principal);
          }
        );
      }
    );
  }
);
