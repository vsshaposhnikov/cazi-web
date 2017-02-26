'use strict';
angular.module('caziWeb')
    .controller('createAdminModalController', function($scope, FileUploader, API_URL, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.userData = {
            token: localStorageService.get('user').token
        };
        $scope.createAdmin = function () {
            $scope.userData.userInfo.role = 'admin';
            $scope.userData.userInfo.organization = 'ДЦКЗ Центр антивірусного захисту';
            $scope.userData.userInfo.creator = localStorageService.get('user').firstName +' '+ localStorageService.get('user').lastName;
                restFullApi.sendPost('createOrUpdateUser', $scope.userData)
                .then(function(admin){
                    //console.log(admin);
                    Notification.success({message: 'Продовжуйте роботу з системою', title: 'Нового адміністратора системи успішно додано'});
                    $state.reload();
                });
        };
    });