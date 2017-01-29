'use strict';
angular.module('caziWeb')
    .controller('updateUserController', function($scope, restFullApi, localStorageService, user, $state){
        $scope.isLoading = true;
        $scope.userData = {
            userInfo: user
        };
        $scope.userData.userInfo.id = user.id;
        $scope.userData.userInfo.token = localStorageService.get('user').token;

        $scope.updateUserSwitch = 'userInfo';

        var avpzData = {
            userInfo: {
                token: localStorageService.get('user').token,
                id: user.id
            }
        };
        $scope.getAvpzListByUser = function () {
            restFullApi.sendPost('getAvpzListByUser', avpzData)
                .then(function(avpzListByUser){
                    console.log(avpzListByUser.data);
                    avpzListByUser != undefined ? $scope.avpzListByUser = avpzListByUser.data : $scope.avpzListByUser = null;
                })
        };
        $scope.getAvpzListByUser();


        $scope.updateUser = function () {
            console.log($scope.userData);
            restFullApi.sendPost('createOrUpdateUser', $scope.userData)
                .then(function(updatedUser){
                    //updatedUser != undefined ? $scope.users = users.data : $scope.users = null;
                    $scope.isLoading = false;
                    $state.reload();
                })
        };
    });