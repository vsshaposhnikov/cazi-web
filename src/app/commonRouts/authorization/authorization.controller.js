'use strict';
angular.module('caziWeb')
    .controller('authorizationController', function($scope, $state, restFullApi, $rootScope, ngDialog, localStorageService, Notification){
        $scope.userData = {};
        $rootScope.isLoading = true;

        $scope.login = function (form) {
            if(form.$valid){
                restFullApi.sendPost('login', $scope.userData)
                    .then(function(user){
                        //console.log(user.data);
                        $rootScope.isLoading = false;
                        if(user.data == 'account notActive' || user.data == 'account blocked') {
                            Notification.warning({message: 'Зверніться до адмінстратора за телефонами на сторінці "Контакти"', title: 'Ваш аккаунт заблоковано, у зв\'язку з не активністю в продовж 7 днів'});
                        }
                        else if(user != undefined){
                                $rootScope.user = user.data;
                                if($rootScope.user.role === 'admin') {
                                    localStorageService.set('user', $rootScope.user);
                                    $state.go('adminDashboard');
                                }
                                if($rootScope.user.role === 'user') {
                                    localStorageService.set('user', $rootScope.user);
                                    $state.go('userDashboard');
                                }
                        }
                    })
            }
        };

        $scope.showRegistrationInfo = function () {
            ngDialog.open({
                template: 'app/modalTemplates/registrationInformation.html',
                showClose: false,
                width: '40%',
                closeByNavigation: true
            });
        };


    });