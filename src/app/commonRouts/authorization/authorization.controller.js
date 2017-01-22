'use strict';
angular.module('caziWeb')
    .controller('authorizationController', function($scope, $state, restFullApi, $rootScope, ngDialog, localStorageService){
        $scope.userData = {};
        $rootScope.isLoading = true;

        $scope.login = function (form) {
            if(form.$valid){
                restFullApi.sendPost('login', $scope.userData)
                    .then(function(user){
                        console.log(user);
                            if(user != undefined){
                                $rootScope.user = user.data;
                                if($rootScope.user.role === 'admin') {
                                    localStorageService.set('user', $rootScope.user);
                                    $state.go('adminDashboard');
                                }
                                if($rootScope.user.role === 'user') {
                                    localStorageService.set('user', $rootScope.user);
                                    $state.go('userDashboard');
                                }
/*                                else {
                                    $state.go('authorization');
                                    Notification.error({message: 'Не достаточно прав доступа!', title: 'Ошибка авторизации'});
                                }*/
                            }
                    })
            }
        };

        $scope.showRegistrationInfo = function () {
            ngDialog.open({
                template: 'app/modalTemplates/registrationInformation.html',
                showClose: false,
                width: '40%',
                closeByNavigation: true,
            });
        };


    });