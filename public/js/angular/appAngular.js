angular.module('appChaplist', ['ui.router', 'controllers', 'factories', 'jackrabbitsgroup.angular-google-auth'])

.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = "application/json";
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/pages/login.html',
            controller: 'ctrlLogin'
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
        });

    $urlRouterProvider.otherwise('index');

});