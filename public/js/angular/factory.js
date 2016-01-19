angular.module('factories', [])

.factory('factory', function ($http, localStorageService) {
    var comun = {};

    comun.user = {};
    comun.token = null;

    comun.login = function (googleInfo, callback) {
        var body = {
            user_id: googleInfo.id,
            email: googleInfo.emails[0].value,
            image: googleInfo.image.url,
            lastName: googleInfo.name.familyName,
            firstName: googleInfo.name.givenName
        }
        return $http.post('/api/auth/google', body)
            .then(function (res) {
                localStorageService.set('user', body);
                localStorageService.set('token', res);
                comun.user = body;
                comun.token = res.data.token;
                callback(comun.user);
            }, function (err) {
                console.log(err);
            });
    }

    comun.getUser = function (callback) {
        if (!comun.user.user_id) {
            comun.user = localStorageService.get('user');
            return comun.user;
        } else
            return comun.user;
    }

    comun.getToken = function (callback) {
        if (!comun.token) {
            comun.token = localStorageService.get('token');
            return comun.token;
        } else
            return "No hay token";
    }

    comun.logout = function () {
        comun.user = null;
        comun.token = null;
        localStorageService.set('user', null);
        localStorageService.set('token', null);
    }


    return comun;

});