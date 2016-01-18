angular.module('factories', [])

.factory('factory', function ($http) {
    var comun = {};

    comun.login = function (googleInfo) {        
        var body = {
            user_id: googleInfo.id,
            email: googleInfo.emails[0].value,
            image: googleInfo.image.url,
            lastName:googleInfo.name.familyName,
            firstName: googleInfo.name.givenName
        } 
        return $http.post('/api/auth/google', body)
        .then(function(res){
            console.log(res);
        },function(err){
            console.log(err);
        });
    }


    return comun;
    
});
