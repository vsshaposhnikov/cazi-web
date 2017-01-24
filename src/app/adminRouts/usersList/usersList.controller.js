'use strict';
angular.module('caziWeb')
    .controller('usersListController', function($scope, restFullApi, localStorageService){
        $scope.userData = {
            token: localStorageService.get('user').token
        };
        $scope.loadUsers = function () {
            restFullApi.sendPost('getAllUsers', $scope.userData)
                .then(function(users){
                    users != undefined ? $scope.users = users.data : $scope.users = null;
                })
        };
        $scope.loadUsers();
    });