Reports =  new Mongo.Collection("reports")

Handlebars.registerHelper('isAdminUser', function() {
  return Roles.userIsInRole(Meteor.user(), ['admin']);
});

Accounts.config({
    forbidClientAccountCreation: false
})
