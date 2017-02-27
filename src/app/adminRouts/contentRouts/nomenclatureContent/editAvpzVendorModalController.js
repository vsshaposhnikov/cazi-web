'use strict';
angular.module('caziWeb')
    .controller('editAvpzVendorModalController', function($scope, FileUploader, API_URL,restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.nomenclatureData = {
            token: localStorageService.get('user').token
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

        $scope.deleteVendor = function (vendor) {
            $scope.nomenclatureData.id = vendor.id;
            restFullApi.sendPost('deleteAvpzVendor', $scope.nomenclatureData)
                .then(function(newNomenclature){
                    //console.log(newNomenclature);

                    if(newNomenclature.data){
                        getAllAvpzVendors();

                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Новий засіб успішно додано'});
                    }
                });
        };

    });