angular.module('controllers', [])

.controller('ctrlHome', function ($scope, $state, $window, $auth, factory) {
    
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
    
    $scope.getProfile = function() {
      factory.getProfile()
        .then(function(response) {
          console.log(response);
          $scope.user = response.data;
        })
        .catch(function(response) {
          console.log(response);
        });
    };

});