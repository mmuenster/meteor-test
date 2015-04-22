Meteor.subscribe('allCases');

Accounts.onLogin(function() {
  Router.go('/')
})