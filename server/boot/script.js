var app = require('../../server/server');
var User = app.models.User;


User.create([
    {username: 'John', email: 'john@doe.com', password: '123456'},
    {username: 'Jane', email: 'jane@doe.com', password: '123456'},
    {username: 'Bob', email: 'bob@projects.com', password: '123456'}
], function(err, users) {
    if (err) return debug('%j', err);
    //...
    // Create projects, assign project owners and project team members
    //...
    // Create the admin role
    Role.create({
      name: 'admin'
    }, function(err, role) {
      if (err) return debug(err);
      debug(role);

      // Make Bob an admin
      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: users[2].id
      }, function(err, principal) {
        if (err) return debug(err);
        debug(principal);
      });
    });

  });
