'use strict';
angular.module('caziWeb')
    .controller('authorizationController', function($scope, $state, restFullApi, $rootScope, ngDialog, localStorageService){
        $scope.userData = {};
        $rootScope.isLoading = true;

        $scope.login = function (form) {
            if(form.$valid){
                restFullApi.sendPost('login', $scope.userData)
                    .then(function(user){
                            if(user != undefined){
                                $rootScope.userInfo = user.data;
                                if($rootScope.userInfo.role === 'admin') {
                                    localStorageService.set('user', $rootScope.userInfo);
                                    $state.go('adminDashboard');
                                }
                                if($rootScope.userInfo.role === 'user') {
                                    localStorageService.set('user', $rootScope.userInfo);
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