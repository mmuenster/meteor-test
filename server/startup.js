  Meteor.startup(function () {
      // bootstrap the admin user if they exist -- You'll be replacing the id later
      if (Meteor.users.findOne("cyq9BhnwkBZRrxjhE"))
          Roles.addUsersToRoles("cyq9BhnwkBZRrxjhE", ['admin']);

      // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
      if(!Meteor.roles.findOne({name: "secret"}))
          Roles.createRole("secret");

      if(!Meteor.roles.findOne({name: "double-secret"}))
          Roles.createRole("double-secret");
  });
