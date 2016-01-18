angular.module('appChaplist', ['ui.router', 'controllers', 'factories', 'satellizer'])

.config(function ($stateProvider, $httpProvider, $urlRouterProvider, $authProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = "application/json";
    $stateProvider
        .state('index', {
            url: '/index',
            templateUrl: 'views/home.html',
            controller: 'ctrlHome'
        });

    $urlRouterProvider.otherwise('index');
    
    $authProvider.withCredentials = true;

    //authenticación con GOOGLE-------------------------------------------
    $authProvider.google({
        clientId: '771080167777-jfpd042qois2mcj326hodt7ubcg6ujh6.apps.googleusercontent.com',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        url: '/api/auth/google',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        display: 'popup',
        type: '2.0',
        popupOptions: {
            width: 1000,
            height: 633
        }
    });
});