'use strict';
angular.module('caziWeb')
    .controller('userDashboardController', function(localStorageService, restFullApi, ngDialog){

        var msgData = {
            token: localStorageService.get('user').token
        };
        function getUrgentMsgList() {
            msgData.userView = 1;
            restFullApi.sendPost('getUrgentMsgList', msgData)
                .then(function(msg){
                    //console.log(msg);
                    if(msg.data.length > 0)
                    //console.log(msg.data);
                    ngDialog.open({
                        template: 'app/modalTemplates/userNotificationModals/userViewUrgentMsg.html',
                        showClose: false,
                        controller: 'getUrgentMsgModalController',
                        width: '55%',
                        closeByNavigation: true,
                        resolve: {
                            urgentMsg: function() {
                                return msg.data;
                            }
                        }
                    });
                });
        }
        getUrgentMsgList();
    });