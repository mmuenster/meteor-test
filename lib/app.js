Reports =  new Mongo.Collection("reports")

Handlebars.registerHelper('isAdminUser', function() {
  return Roles.userIsInRole(Meteor.user(), ['admin']);
});

Accounts.config({
    forbidClientAccountCreation: false
})

Schema={};  //Initialize Schema in the lib folder to hold all the schema in the models
