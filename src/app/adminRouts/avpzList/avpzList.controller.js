'use strict';
angular.module('caziWeb')
    .controller('avpzListController', function($scope, restFullApi, ngDialog, localStorageService){
        var avpzData = {
            token: localStorageService.get('user').token
        };
        function getAvpzList() {
            restFullApi.sendPost('getAvpzList', avpzData)
                .then(function(avpzList){
                    $scope.avpzList = avpzList.data;
                });
        }
        getAvpzList();

        $scope.openEditModal = function (avpz) {
            ngDialog.open({
                template: 'app/modalTemplates/editAvpz.html',
                showClose: false,
                controller: 'editAvpzModalController',
                width: '40%',
                closeByNavigation: true,
                resolve: {
                    avpz: function() {
                        return avpz;
                    }
                }
            });
        };

        $scope.openSignatureModal = function (avpz) {
            ngDialog.open({
                template: 'app/modalTemplates/uploadSignature.html',
                showClose: false,
                controller: 'editAvpzModalController',
                width: '40%',
                closeByNavigation: true,
                resolve: {
                    avpz: function() {
                        return avpz;
                    }
                }
            });
        };

        $scope.openDeleteModal = function (avpz) {
        ngDialog.open({
                template: 'app/modalTemplates/deleteAvpz.html',
                showClose: false,
                controller: 'editAvpzModalController',
                width: '40%',
                closeByNavigation: true,
                resolve: {
                    avpz: function() {
                        return avpz;
                    }
                }
            });
        };

    });