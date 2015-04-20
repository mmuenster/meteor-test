angular.module('myApp')
  .controller('CaseController', ['$scope', '$meteor', function($scope, $meteor) {
    console.log("In the controller")
    $scope.cases = Cases.find().fetch(); //$meteor.collection(Cases);
    console.log($scope.cases, $scope.cases.length)
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