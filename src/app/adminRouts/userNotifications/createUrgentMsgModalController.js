'use strict';
angular.module('caziWeb')
    .controller('createUrgentMsgModalController', function($scope, FileUploader, API_URL, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.msgData = {
            token: localStorageService.get('user').token,
            urgentMsg: {}
        };
        $scope.createUrgentMsg = function () {
            $scope.msgData.urgentMsg.editing = 0;
            $scope.msgData.urgentMsg.creator =  localStorageService.get('user').firstName
                                                + ' ' +
                                                localStorageService.get('user').lastName;
                restFullApi.sendPost('createOrUpdateUrgentMsg', $scope.msgData)
                .then(function(newMsg){
                    //console.log(newMsg.data);
                    Notification.success({message: 'Продовжуйте роботу з системою.', title: 'Нове АВПЗ успішно додано.'});
                    $state.reload();
                });
        };
    });