angular.module('factories', [])

.factory('factory', function ($http, localStorageService) {
    var comun = {};

    comun.user = null;
    comun.token = null;
    comun.apps = [];
    comun.app = {};

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
        comun.apps = [];
        comun.app = {};
        localStorageService.set('user', null);
        localStorageService.set('apps', []);
        localStorageService.set('token', null);
    }

    comun.createApp = function (name, packageName, hashKey, callback) {
        var body = {
            name: name,
            packageName: packageName,
            hashKey: hashKey
        }
        return $http.post('/api/App/' + comun.token, body)
            .then(function (res) {
                addAppLS(res);
                callback(res);
            }, function (err) {
                callback(err);
            });
    }

    comun.getAppsFromServer = function () {
        return $http.get('/api/Apps/' + comun.token)
            .success(function (res) {
                setAppsLS(res);
                return res;
            });
    }

    comun.getApps = function () {
        if (comun.apps && comun.apps.length < 1) {
            comun.apps = localStorageService.get('apps');
            return comun.apps;
        } else
            return comun.apps;
    }

    comun.deleteApp = function (index, app, callback) {
        return $http.delete('/api/App/' + app + '/' + comun.token)
            .success(function (res) {
                if (res == 1)
                    comun.apps.splice(index, 1);
                localStorageService.set('apps', comun.apps);
                callback(res);
                return res;
            });
    }

    comun.updateApp = function (app) {
        return $http.put('/api/App/' + app.id + '/' + comun.token, app)
            .success(function (res) {
                var i = comun.apps.indexOf(app);
                comun.apps[i] = app;
                localStorageService.set('apps', comun.apps);
                comun.app = {};
            })
    }


    function setAppsLS(res) {
        res = JSON.parse(res);
        localStorageService.set('apps', res);
        comun.apps = res;
    }

    function addAppLS(res) {
        res = JSON.parse(res.data);
        comun.apps.push(res);
        localStorageService.set('apps', comun.apps);
    }

    return comun;
});