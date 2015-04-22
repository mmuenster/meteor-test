 angular.module('myApp', ['angular-meteor'])
	.config(function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[');
	    $interpolateProvider.endSymbol(']]');
	  });


  Meteor.subscribe('allCases');

Accounts.onLogin(function() {
  Router.go('/')
})