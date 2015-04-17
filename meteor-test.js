    requireAdmin = function () {
      if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
              this.redirect('/');
            } else {
              this.next();
            }
    }

    Router.configure({
        layoutTemplate: 'layout',
        loadingTemplate: 'chat',
        notFoundTemplate: 'caseList'
    });

    Router.onBeforeAction(function() {
      if (! Meteor.userId()) {
        this.render('login');
      } else {
        this.next();
      }
    });

    Router.route('/', function() {
      this.redirect('/caseList');
    });

    Router.route('caseList');

    Router.route('chat');

    Router.route('admin', {
        path:'/admin',
        template: 'accountsAdmin',
        onBeforeAction: requireAdmin
    });

Handlebars.registerHelper('isAdminUser', function() {
  return Roles.userIsInRole(Meteor.user(), ['admin']);
});

Accounts.config({
    forbidClientAccountCreation: false
})

Messages = new Mongo.Collection("messages")
Cases = new Mongo.Collection("cases")


if (Meteor.isServer) {
    Meteor.publish('allCases', function(filter) {
      return Cases.find();
    })

    Meteor.startup(function () {
        // bootstrap the admin user if they exist -- You'll be replacing the id later
        if (Meteor.users.findOne("uLLxN3XTTTtDHM8Bk"))
            Roles.addUsersToRoles("uLLxN3XTTTtDHM8Bk", ['admin']);

        // create a couple of roles if they don't already exist (THESE ARE NOT NEEDED -- just for the demo)
        if(!Meteor.roles.findOne({name: "secret"}))
            Roles.createRole("secret");

        if(!Meteor.roles.findOne({name: "double-secret"}))
            Roles.createRole("double-secret");
    });
}

if (Meteor.isClient) {

  Meteor.subscribe('allCases');
  console.log("under meteor subscribe")

  Template.chat.helpers({
    messages: function() {
      return Messages.find();
    }
  })

  Template.chat.events({
    "submit #new-message": function (event) {
      var text = event.target.text.value;

      Messages.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

  var myApp = angular.module('myApp', ['angular-meteor']);

  myApp.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
  });

  myApp.controller('CaseController', ['$scope', '$meteor', function($scope, $meteor) {
    console.log("In the controller")
    $scope.cases = Cases.find().fetch(); //$meteor.collection(Cases);

    $scope.orderBy = "receivedDate";
    $scope.reverse = false;
    $scope.orderString = "";
    
    $scope.changeSortOrder = function(sortKey) {
      if(sortKey==$scope.orderBy) {
        $scope.reverse = !$scope.reverse
        if ($scope.reverse) {
          $scope.orderString = "-" + $scope.orderBy;
        } else {
          $scope.orderString = $scope.orderBy;
        }
      } else {
        $scope.orderBy = sortKey;
        $scope.reverse = false;
        $scope.orderString = $scope.orderBy;
      }
    }

  }])
}


