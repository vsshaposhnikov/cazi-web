'use strict';
angular
    .module('caziWeb')
    .controller('usersListController', function($scope, restFullApi, localStorageService, ngDialog, $state){
        $scope.isLoading = true;
        $scope.userData = {
            token: localStorageService.get('user').token,
            userInfo: {
                searchWord: null
            }
        };
        $scope.findUsers = function () {
            restFullApi.sendPost('findUsers', $scope.userData)
                .then(function(users){
                    //console.log(users.data);
                    users != undefined ? $scope.users = users.data : $scope.users = null;
                    $scope.isLoading = false;
                })
        };
        $scope.$watch('userData.userInfo.searchWord', function() {
            $scope.findUsers();
            //console.log($scope.userData);

        });
        $scope.openActivateModal = function (user) {
            ngDialog.open({
                template: 'app/modalTemplates/setActiveUser.html',
                showClose: false,
                controller: 'updateUserController',
                width: '40%',
                closeByNavigation: true,
                resolve: {
                    user: function() {
                        return user;
                    }
                }
            });
        };
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