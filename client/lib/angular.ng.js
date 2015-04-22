 angular.module('myApp', ['angular-meteor'])
	.config(function($interpolateProvider) {
	    $interpolateProvider.startSymbol('[[');
	    $interpolateProvider.endSymbol(']]');
	  });


