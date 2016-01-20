angular.module('appChaplist', ['ui.router', 'controllers', 'factories', 'datatables', 'jackrabbitsgroup.angular-google-auth', 'LocalStorageModule'])

.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = "application/json";
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/pages/login.html',
            controller: 'ctrlLogin',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/pages/home.html',
            controller: 'ctrlHome',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('acerca', {
            url: '/acerca',
            templateUrl: 'views/pages/acerca.html',
            controller: 'ctrlAcerca'
        })
        .state('formApp', {
            url: '/formApp',
            templateUrl: 'views/pages/formApp.html',
            controller: 'ctrlFormApp',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('apps', {
            url: '/apps',
            templateUrl: 'views/pages/apps.html',
            controller: 'ctrlApps as ap',
            resolve: {
                loginRequired: loginRequired
            }
        });

    $urlRouterProvider.otherwise('index');

    function skipIfLoggedIn($q, factory) {
        console.log(factory.isAuthenticated());
        var deferred = $q.defer();
        if (factory.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        deferred.resolve();
        return deferred.promise;
    }

    function loginRequired($q, $state, factory) {
        var deferred = $q.defer();
        if (factory.isAuthenticated()) {
            deferred.resolve();
        } else {
            $state.go('index');
        }
        return deferred.promise;
    }
});