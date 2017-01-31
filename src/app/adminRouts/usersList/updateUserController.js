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
        $scope.avpzList = [];
        function getAvpzList () {
            restFullApi.sendPost('getAvpzList', avpzData)
                .then(function(avpzList){
                    return avpzList != undefined ? avpzList.data : null;
                }).then(function(avpzList){
                    console.log(avpzList)
                })
        }
        getAvpzList();
        console.log($scope.avpzList)


        $scope.avpzListByUser = [];
        function getAvpzListByUser () {
            restFullApi.sendPost('getAvpzListByUser', avpzData)
                .then(function(avpzListByUser){
                    //console.log(avpzListByUser.data);
                    avpzListByUser != undefined ? $scope.avpzListByUser = avpzListByUser.data : $scope.avpzListByUser = null;
                    console.log($scope.avpzListByUser);

                })
        }
        getAvpzListByUser();



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