'use strict';
angular.module('caziWeb')
    .controller('createLegalModalController', function($scope, FileUploader, API_URL, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.legalBaseData = {
            token: localStorageService.get('user').token,
            legalBaseInfo: {}
        };
        $scope.createNewLegal = function () {
                restFullApi.sendPost('createOrUpdateLegalBase', $scope.legalBaseData)
                .then(function(NewLegal){
                    //console.log(NewLegal);
                    if(NewLegal.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Новий запис успішно додано'});
                        $state.reload();
                    }
                });
        };
    });