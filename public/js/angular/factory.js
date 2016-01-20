angular.module('factories', [])

.factory('factory', function ($http, localStorageService) {
    var comun = {};

    comun.user = {};
    comun.token = null;
    comun.apps = [];

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
                res = JSON.parse(res.data);
                comun.user = body;
                comun.token = res.token;
                localStorageService.set('user', body);
                localStorageService.set('token', comun.token);
                callback(comun.user);
            }, function (err) {
                console.log(err);
            });
    }

    comun.getUser = function (callback) {
        if (!comun.user) {
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

    comun.isAuthenticated = function () {
        if (comun.getToken())
            return true;
        else
            return false;
    }

    comun.logout = function () {
        comun.user = null;
        comun.token = null;
        localStorageService.set('user', null);
        localStorageService.set('token', null);
    }

    comun.createApp = function (name, packageName, hashKey, callback) {
        var body = {
            name: name,
            packageName: packageName,
            hashKey: hashKey
        }
        console.log(comun.token)
        return $http.post('/api/App/' + comun.token, body)
            .then(function (res) {
                callback(res);
            }, function (err) {
                callback(err);
            });
    }

    comun.getApps = function () {
        return $http.get('/api/Apps/' + comun.token)
            .success(function (res) {

                return res;
            });
    }


    return comun;

});