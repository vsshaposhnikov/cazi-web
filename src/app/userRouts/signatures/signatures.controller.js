'use strict';
angular.module('caziWeb')
    .controller('signaturesController', function(restFullApi, $scope, localStorageService){
        var avpzData = {
            userInfo:{
                id: localStorageService.get('user').id
            },
            token: localStorageService.get('user').token
        };
        function getAvpzListByUser() {
            restFullApi.sendPost('getAvpzListByUser', avpzData)
                .then(function(avpzList){
                    $scope.avpzList = avpzList.data;
                });
        }
        getAvpzListByUser();
    });