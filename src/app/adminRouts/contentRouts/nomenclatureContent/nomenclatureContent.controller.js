'use strict';
angular.module('caziWeb')
    .controller('nomenclatureContentController', function($scope, restFullApi, localStorageService, ngDialog){
        $scope.avpzNomenclature = {
            token: localStorageService.get('user').token
        };
        $scope.isLoading = true;
        function getAllAvpzNomenclature() {
            restFullApi.sendPost('getAllAvpzNomenclature', $scope.avpzNomenclature)
                .then(function(avpzNomenclature){
                    $scope.isLoading = false;
                    $scope.avpzNomenclature = avpzNomenclature.data;
                });
        }
        getAllAvpzNomenclature();
        $scope.openCreateVendorModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/nomenclatureModals/createVendor.html',
                showClose: false,
                controller: 'createAvpzNomenclatureModalController',
                width: '40%',
                closeByNavigation: true
            });
        };
        $scope.openCreateNomenclatureModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/nomenclatureModals/createNomenclature.html',
                showClose: false,
                controller: 'createAvpzNomenclatureModalController',
                width: '55%',
                closeByNavigation: true
            });
        };
        $scope.openDeleteModal = function (nomenclature) {
            ngDialog.open({
                template: 'app/modalTemplates/nomenclatureModals/deleteNomenclature.html',
                showClose: false,
                controller: 'editAvpzNomenclatureModalController',
                width: '40%',
                closeByNavigation: true,
                resolve: {
                    nomenclature: function() {
                        return nomenclature;
                    }
                }
            });
        };
        $scope.openEditModal = function (nomenclature) {
            ngDialog.open({
                template: 'app/modalTemplates/nomenclatureModals/editNomenclature.html',
                showClose: false,
                controller: 'editAvpzNomenclatureModalController',
                width: '55%',
                closeByNavigation: true,
                resolve: {
                    nomenclature: function() {
                        return nomenclature;
                    }
                }
            });
        };
        $scope.openGetVendorsModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/nomenclatureModals/vendorList.html',
                showClose: false,
                controller: 'editAvpzVendorModalController',
                width: '30%',
                closeByNavigation: true
            });
        };
    });