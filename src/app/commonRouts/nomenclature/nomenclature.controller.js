'use strict';
angular.module('caziWeb')
    .controller('nomenclatureController', function($scope, restFullApi){
        $scope.isLoading = true;
        function getAllAvpzNomenclatureUser() {
            restFullApi.sendPost('getAllAvpzNomenclatureUser', {})
                .then(function(avpzNomenclature){
                    $scope.isLoading = false;
                    $scope.avpzNomenclature = avpzNomenclature.data;
                });
        }
        getAllAvpzNomenclatureUser();
    });