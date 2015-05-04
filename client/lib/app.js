Meteor.subscribe('allCases');

Accounts.onLogin(function() {
	console.log("In onLogin")
  //Router.go('/')
})

SimpleSchema.debug = true