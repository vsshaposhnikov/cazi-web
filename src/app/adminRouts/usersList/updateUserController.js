'use strict';
angular.module('caziWeb')
    .controller('updateUserController', function($scope, restFullApi, localStorageService, user, $state, $q, Notification){
        //$scope.isLoading = true;

        $scope.userData = {
            token: localStorageService.get('user').token,
            userInfo: user
        };


        $scope.updateUserSwitch = 'userInfo';

        var avpzData = {
            token: localStorageService.get('user').token,
            userInfo: {
                id: user.id
            }
        };

        $q.all([restFullApi.sendPost('getAvpzList', avpzData), restFullApi.sendPost('getAvpzListByUser', avpzData)]).then(function(data){
            $scope.avpzList = data[0] != undefined ? data[0].data : [];
            var avpzListByUser = data[1] != undefined ? data[1].data : [];
            $scope.avpzList.map(function(avp){
                avp.isUsed = false;
            });
            avpzListByUser.map(function(avp){
                var index = _.findIndex($scope.avpzList, { 'id': avp.avpzId});
                if(index > -1){
                    $scope.avpzList[index].isUsed = true;
                }
            });
        });


        $scope.updateUser = function () {
            $scope.userData.userInfo.avpzArray = _.filter($scope.avpzList, {'isUsed' : true}).map(function(avp){return avp.id});
            //console.log($scope.userData);
            restFullApi.sendPost('createOrUpdateUser', $scope.userData)
                .then(function(updatedUser){
                    //console.log(updatedUser);
                    Notification.success({message: updatedUser.data, title: 'Вітаю, користувача  оновлено!'});
                    $scope.users = updatedUser != undefined ? updatedUser.data : null;
                    $state.reload();
                })
        };

        $scope.setActive = function () {
            $scope.userData = {
                token: localStorageService.get('user').token,
                id: $scope.userData.userInfo.id
            };
            restFullApi.sendPost('setActive', $scope.userData)
                .then(function(active){
                    //console.log(active.data);
                    Notification.success({message: active.data, title: 'Вітаю, користувача  оновлено!'});
                    $state.reload();
                    $scope.isLoading = false;
                })
        };

    });