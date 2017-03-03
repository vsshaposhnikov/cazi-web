'use strict';
angular.module('caziWeb')
    .controller('signaturesController', function(restFullApi, $scope, localStorageService, ngDialog){
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

        $scope.openAdminRequestModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/adminRequest.html',
                showClose: false,
                controller: 'adminRequestModalController',
                width: '55%',
                closeByNavigation: true
            });
        };

    });