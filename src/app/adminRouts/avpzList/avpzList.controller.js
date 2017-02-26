'use strict';
angular.module('caziWeb')
    .controller('avpzListController', function($scope, restFullApi, ngDialog, localStorageService){
        $scope.isLoading = true;
        var avpzData = {
            token: localStorageService.get('user').token
        };
        function getAvpzList() {
            restFullApi.sendPost('getAvpzList', avpzData)
                .then(function(avpzList){
                    $scope.isLoading = false;
                    $scope.avpzList = avpzList.data;
                });
        }
        getAvpzList();

        $scope.openEditModal = function (avpz) {
            ngDialog.open({
                template: 'app/modalTemplates/avpzModals/editAvpz.html',
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
                template: 'app/modalTemplates/avpzModals/uploadSignature.html',
                showClose: false,
                controller: 'editAvpzModalController',
                width: '55%',
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
                template: 'app/modalTemplates/avpzModals/deleteAvpz.html',
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
        $scope.openStorageModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/avpzModals/signatureStorage.html',
                showClose: false,
                controller: 'signatureStorageModalController',
                width: '55%',
                closeByNavigation: true
            });
        };
        $scope.openInstallModal = function (avpz) {
            ngDialog.open({
                template: 'app/modalTemplates/avpzModals/signatureExeStorage.html',
                showClose: false,
                controller: 'editAvpzModalController',
                width: '55%',
                closeByNavigation: true,
                resolve: {
                    avpz: function() {
                        return avpz;
                    }
                }
            });
        };
        $scope.openCreateModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/avpzModals/createAvpz.html',
                showClose: false,
                controller: 'createAvpzModalController',
                width: '40%',
                closeByNavigation: true
            });
        };

    });