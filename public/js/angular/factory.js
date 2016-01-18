angular.module('factories', [])

.factory('factory', function ($http) {
    var comun = {};
    
    comun.getProfile = function() {
        return $http.get('/api/me');
      }
    return comun;
})