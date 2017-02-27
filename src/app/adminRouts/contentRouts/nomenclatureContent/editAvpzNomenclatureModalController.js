'use strict';
angular.module('caziWeb')
    .controller('editAvpzNomenclatureModalController', function($scope, FileUploader, API_URL, nomenclature,restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.nomenclatureData = {
            token: localStorageService.get('user').token,
            vendorInfo: nomenclature
        };
        //console.log($scope.nomenclatureData);
        function getAllAvpzVendors() {
            restFullApi.sendPost('getAllAvpzVendors', $scope.nomenclatureData)
                .then(function(vendors){
                    //console.log(vendors);
                    $scope.vendorsArr = vendors.data;
                });
        }
        getAllAvpzVendors();
        $scope.deleteNomenclature = function () {
            $scope.nomenclatureData = {
                token: localStorageService.get('user').token,
                id: nomenclature.id
            };
                restFullApi.sendPost('deleteAvpzNomenclature', $scope.nomenclatureData)
                .then(function(deleted){
                    //console.log(newNomenclature);
                    if(deleted.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Засіб успішно видалено'});
                        $state.reload();
                    }
                });
        };
        $scope.editNomenclature = function () {
            $scope.nomenclatureData.vendorInfo.edit = 1;
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