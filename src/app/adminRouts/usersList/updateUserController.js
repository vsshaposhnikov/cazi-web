'use strict';
angular.module('caziWeb')
    .controller('updateUserController', function($scope, restFullApi, localStorageService, user, $state, $q){
        //$scope.isLoading = true;

        $scope.userData = {
            userInfo: user
        };

        $scope.userData.userInfo.token = localStorageService.get('user').token;

        $scope.updateUserSwitch = 'userInfo';

        var avpzData = {
            userInfo: {
                token: localStorageService.get('user').token,
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
            $scope.userData.userInfo.avpz = _.filter($scope.avpzList, {'isUsed' : true}).map(function(avp){return avp.id});
            console.log($scope.userData);
            /*restFullApi.sendPost('createOrUpdateUser', $scope.userData)
                .then(function(updatedUser){
                    //updatedUser != undefined ? $scope.users = users.data : $scope.users = null;
                    $scope.isLoading = false;
                    $state.reload();
                })*/
        };
    });