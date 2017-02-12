'use strict';
angular.module('caziWeb')
    .controller('usersListController', function($scope, restFullApi, localStorageService, ngDialog){
        $scope.isLoading = true;
        $scope.userData = {
            token: localStorageService.get('user').token,
            userInfo: {}
        };
        $scope.loadUsers = function () {
            restFullApi.sendPost('getAllUsers', $scope.userData)
                .then(function(users){
                    //console.log(users);
                    users != undefined ? $scope.users = users.data : $scope.users = null;
                    $scope.isLoading = false;
                })
        };
        $scope.loadUsers();
        $scope.updateUser = function (user) {
            ngDialog.open({
                template: 'app/modalTemplates/updateUser.html',
                showClose: false,
                controller: 'updateUserController',
                width: '60%',
                closeByNavigation: true,
                resolve: {
                    user: function() {
                        return user;
                    }
                }
            });
        };
    });