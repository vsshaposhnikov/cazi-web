'use strict';
angular.module('caziWeb')
    .controller('userNotificationsController', function($scope, restFullApi, ngDialog, localStorageService){
        $scope.isLoading = true;
        $scope.showTable = false;
        var msgData = {
          token: localStorageService.get('user').token
        };
        $scope.openCreateModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/userNotificationModals/createUrgentMsg.html',
                showClose: false,
                controller: 'createUrgentMsgModalController',
                width: '55%',
                closeByNavigation: true
            });
        };
        $scope.openDeleteModal = function (urgentMsg) {
            ngDialog.open({
                template: 'app/modalTemplates/userNotificationModals/deleteUrgentMsg.html',
                showClose: false,
                controller: 'editUrgentMsgModalController',
                width: '40%',
                closeByNavigation: true,
                resolve: {
                    urgentMsg: function() {
                        return urgentMsg;
                    }
                }
            });
        };
        $scope.openEditModal = function (urgentMsg) {
            ngDialog.open({
                template: 'app/modalTemplates/userNotificationModals/editUrgentMsg.html',
                showClose: false,
                controller: 'editUrgentMsgModalController',
                width: '55%',
                closeByNavigation: true,
                resolve: {
                    urgentMsg: function() {
                        return urgentMsg;
                    }
                }
            });
        };
        $scope.openPublishModal = function (urgentMsg) {
            ngDialog.open({
                template: 'app/modalTemplates/userNotificationModals/publishUrgentMsg.html',
                showClose: false,
                controller: 'editUrgentMsgModalController',
                width: '40%',
                closeByNavigation: true,
                resolve: {
                    urgentMsg: function() {
                        return urgentMsg;
                    }
                }
            });
        };

        function getUrgentMsgList() {
            msgData.userView = 0;
            restFullApi.sendPost('getUrgentMsgList', msgData)
                .then(function(msg){
                    //console.log(msg);
                    $scope.isLoading = false;
                    $scope.messages = msg.data;
                    if(msg.data.length > 0)
                    $scope.showTable = true;
                });
        }
        getUrgentMsgList();
    });