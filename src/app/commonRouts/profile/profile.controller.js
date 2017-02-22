'use strict';
angular.module('caziWeb')
    .controller('profileController', function($scope, $state, restFullApi, localStorageService, Notification){
        var previousState;
        $scope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
            previousState = from;
        });
        $scope.prevState = function () {
            $state.go(previousState.name)
        };
         $scope.changePasswordData = {
            token: localStorageService.get('user').token,
        };
        $scope.changePassword = function () {
            restFullApi.sendPost('changePassword', $scope.changePasswordData)
                .then(function(updatedPassword){
                    if(updatedPassword.data == 'password changed'){
                        $scope.changePasswordData = {};
                        Notification.success({message: 'Пароль успішно змінено!', title: 'Ви можете продовжувати працювати з системою'});
                        $state.go('userDashboard');
                    }
                    else {
                        Notification.warning({message: 'Ви ввели не корректний діючий пароль'});
                    }
                });
        }

    });