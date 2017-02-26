'use strict';
angular.module('caziWeb')
    .controller('editUrgentMsgModalController', function($scope, FileUploader, urgentMsg, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.msgData = {
            token: localStorageService.get('user').token,
            urgentMsg: urgentMsg
        };
        $scope.publishUrgentMsg = function () {
            $scope.msgData.urgentMsg = {
                id: urgentMsg.id,
                publish: 1
            };
            restFullApi.sendPost('publishUrgentMsg', $scope.msgData)
            .then(function(published){
                //console.log(published.data);
                Notification.success({message: 'Продовжуйте роботу з системою', title: 'Повідомлення успішно додано'});
                $state.reload();
            });
        };
        $scope.deleteUrgentMsg = function () {
            $scope.msgData.urgentMsg.id = urgentMsg.id;
                restFullApi.sendPost('deleteUrgentMsg', $scope.msgData)
                .then(function(newMsg){
                    //console.log(newMsg.data);
                    Notification.success({message: 'Продовжуйте роботу з системою', title: 'Повідомлення успішно видалено'});
                    $state.reload();
                });
        };
        $scope.editUrgentMsg = function () {
            $scope.msgData.urgentMsg.editing = 1;
            $scope.msgData.urgentMsg.creator =  localStorageService.get('user').firstName
                                                 + ' ' +
                                                localStorageService.get('user').lastName;
            restFullApi.sendPost('createOrUpdateUrgentMsg', $scope.msgData)
                .then(function(editedMsg){
                    //console.log(editedMsg.data);
                    Notification.success({message: 'Продовжуйте роботу з системою', title: 'Повідомлення успішно змінено'});
                    $state.reload();
                });
        }
    });