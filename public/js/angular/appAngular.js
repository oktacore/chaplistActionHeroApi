angular.module('appChaplist', ['ui.router', 'controllers', 'factories', 'jackrabbitsgroup.angular-google-auth'])

.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = "application/json";
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/home.html',
            controller: 'ctrlHome'
        });

    $urlRouterProvider.otherwise('index');

});
