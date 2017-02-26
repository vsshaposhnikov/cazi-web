'use strict';
angular.module('caziWeb')
    .controller('createAvpzModalController', function($scope, FileUploader, API_URL, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.avpzData = {
            token: localStorageService.get('user').token
        };
        $scope.createAvpz = function () {
            $scope.avpzData.avpzInfo.createTitle = 1;
                restFullApi.sendPost('createOrUpdateAvpz', $scope.avpzData)
                .then(function(newAvpz){
                    //console.log(newAvpz);
                    Notification.success({message: 'Продовжуйте роботу з системою', title: 'Нове АВПЗ успішно додано'});
                    $state.reload();
                });
        };
    });