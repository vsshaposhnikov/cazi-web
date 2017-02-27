'use strict';
angular.module('caziWeb')
    .controller('createAvpzNomenclatureModalController', function($scope, FileUploader, API_URL, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.nomenclatureData = {
            token: localStorageService.get('user').token,
            vendorInfo: {}
        };
        $scope.createNewVendor = function () {
                restFullApi.sendPost('createOrUpdateAvpzVendor', $scope.nomenclatureData)
                .then(function(newNomenclature){
                    //console.log(newNomenclature);
                    if(newNomenclature.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Новий вендор успішно додано'});
                        $state.reload();
                    }
                });
        };
        function getAllAvpzVendors() {
            restFullApi.sendPost('getAllAvpzVendors', $scope.nomenclatureData)
                .then(function(vendors){
                    //console.log(vendors);
                    $scope.vendorsArr = vendors.data;
                });
        }
        getAllAvpzVendors();
        $scope.createNewNomenclature = function () {
            restFullApi.sendPost('createOrUpdateAvpzNomenclature', $scope.nomenclatureData)
                .then(function(newNomenclature){
                    //console.log(newNomenclature);
                    if(newNomenclature.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Новий засіб успішно додано'});
                        $state.reload();
                    }
                });
        };
    });