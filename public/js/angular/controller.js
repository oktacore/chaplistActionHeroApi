angular.module('controllers', [])

.controller('ctrlLogin', function ($scope, $state, $window, factory, jrgGoogleAuth) {
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
            factory.login(googleInfo.rawData, function (res) {
                if (res.user_id) {
                    $state.go('home');
                } else {
                    $window.alert('Ocurrio algun error durante la autenticacion');
                }
            });

        });

    })
    .controller('ctrlHome', function ($scope, $state, $window, factory,$rootScope) {

        var vm = this;
        var user = factory.getUser();
        var token = factory.getToken();
        $rootScope.token = token;
        $scope.logout = function () {
            factory.logout();
            $state.go('index');
        }

    })
    .controller('ctrlAcerca', function ($scope, $state, $window, factory) {



    });