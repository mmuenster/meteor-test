Messages = new Mongo.Collection("messages")
Cases = new Mongo.Collection("cases")


Handlebars.registerHelper('isAdminUser', function() {
  return Roles.userIsInRole(Meteor.user(), ['admin']);
});

Accounts.config({
    forbidClientAccountCreation: false
})
