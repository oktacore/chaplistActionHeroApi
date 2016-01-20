angular.module('appChaplist', ['ui.router', 'controllers', 'factories','datatables','jackrabbitsgroup.angular-google-auth','LocalStorageModule'])

.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = "application/json";
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/pages/login.html',
            controller: 'ctrlLogin',
            /*            resolve: {
                            skipIfLoggedIn: skipIfLoggedIn
                        }*/
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/pages/home.html',
            controller: 'ctrlHome'
        })
        .state('acerca', {
            url: '/acerca',
            templateUrl: 'views/pages/acerca.html',
            controller: 'ctrlAcerca'
        })
        .state('formApp', {
            url: '/formApp',
            templateUrl: 'views/pages/formApp.html',
            controller: 'ctrlFormApp'
        })
        .state('apps', {
            url: '/apps',
            templateUrl: 'views/pages/apps.html',
            controller: 'ctrlApps as ap'
        });

    $urlRouterProvider.otherwise('index');

    /*    function skipIfLoggedIn($q) {
            var deferred = $q.defer();
            if ($rootScope.token) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        }*/

});