'use strict';
angular.module('caziWeb')
    .controller('adminRequestModalController', function($scope, FileUploader, API_URL, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.adminRequestData = {
            token: localStorageService.get('user').token,
            adminRequest: {}
        };
        $scope.sendRequest = function () {
            $scope.adminRequestData.adminRequest.email = localStorageService.get('user').email;
            $scope.adminRequestData.adminRequest.login = localStorageService.get('user').login;
            $scope.adminRequestData.adminRequest.firstName = localStorageService.get('user').firstName;
            $scope.adminRequestData.adminRequest.lastName = localStorageService.get('user').lastName;
                restFullApi.sendPost('adminMailRequest', $scope.adminRequestData)
                .then(function(adminRequestData){
                    //console.log(adminRequestData);
                    //console.log($scope.adminRequestData);
                    if(adminRequestData.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Ваше звернення відправлено!'});
                        $state.reload();
                    }
                });
        };
    });