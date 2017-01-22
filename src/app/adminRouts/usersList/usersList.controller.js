'use strict';
angular.module('caziWeb')
    .controller('usersListController', function($scope, restFullApi, localStorageService){

        $scope.userData = {
            token: localStorageService.get('user').token
        };
        $scope.loadUsers = function () {
            restFullApi.sendPost('getAllUsers', $scope.userData)
                .then(function(user){
                    console.log(user.data);
                    $scope.users = user.data;
                })
        };
    $scope.loadUsers();
    });