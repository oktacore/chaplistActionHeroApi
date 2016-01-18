angular.module('controllers', [])

.controller('ctrlHome', function ($scope, $state, $window, factory, jrgGoogleAuth) {
    var googleClientId = '771080167777-jfpd042qois2mcj326hodt7ubcg6ujh6.apps.googleusercontent.com';
    var evtGoogleLogin = "evtGoogleLogin";
    
    jrgGoogleAuth.init({
        'client_id': googleClientId,
        'scopeHelp': ['login', 'email', 'profile']
    });
    
    $scope.googleLogin = function () {
        jrgGoogleAuth.login({
            'extraInfo': {
                'user_id': true,
                'emails': true
            },
            'callback': {
                'evtName': evtGoogleLogin,
                'args': []
            }
        });
    };

    $scope.googleInfo;

    $scope.$on(evtGoogleLogin, function (evt, googleInfo) {
        $scope.googleInfo = googleInfo;
        factory.login(googleInfo.rawData);
    });

});