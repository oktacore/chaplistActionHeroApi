angular.module('controllers', [])

.controller('ctrlLogin', function ($scope, $state, $window, factory, jrgGoogleAuth) {
        var googleClientId = '771080167777-jfpd042qois2mcj326hodt7ubcg6ujh6.apps.googleusercontent.com';
        var evtGoogleLogin = "evtGoogleLogin";

        $scope.headerHome = false;
        $scope.headerLogin = true;
    
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
    .controller('ctrlHome', function ($scope, $state, $window, factory, $rootScope) {

        var vm = this;
        var user = factory.getUser();

        $scope.user = user;

        $scope.headerHome = true;
        $scope.headerLogin = false;

        $scope.logout = function () {
            factory.logout();
            $state.go('index');
        }

    })
    .controller('ctrlAcerca', function ($scope, $state, $window, factory) {

        var vm = this;
        var user = factory.getUser();
        $scope.headerHome = false;
        $scope.headerLogin = true;
        if (user.user_id) {
            $scope.headerHome = true;
            $scope.headerLogin = false;
        }


    })
    .controller('ctrlFormApp', function ($scope, $state, $window, factory) {

        $scope.data = {};
        $scope.headerHome = true;
        $scope.headerLogin = false;

        $scope.createApp = function (name, packageName, hashKey) {
            if (name == "" || packageName == "" || hashKey == "") {
                $window.alert("Llene todos los campos para la creación de la App!!")
                return;
            }
            factory.createApp(name, packageName, hashKey, function (res) {
                console.log(res);
            });
        }

    })
    .controller('ctrlApps', function ($scope, $state, $window, factory, DTOptionsBuilder, DTColumnDefBuilder) {
        var vm = this;
        vm.apps = [];
        $scope.headerHome = true;
        $scope.headerLogin = false;
        
        //*****************************************************************************************************
        vm.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(10);
        vm.dtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4)
        ];


        factory.getApps().then(function (res) {
            console.log(res);
            vm.apps = JSON.parse(res.data);
        });



        //Definition of functions for salePoint view actions
        vm.removeMedicine = removeMedicine;

        function removeMedicine(index, medicine) {
            vm.listmedicine.splice(index, 1);
        }


    });