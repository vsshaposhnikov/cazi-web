'use strict';
angular.module('caziWeb')
    .controller('signatureStorageModalController', function($scope, FileUploader, API_URL, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.isLoading = true;
        var avpzData = {
            token: localStorageService.get('user').token
        };
        function getFilesList() {
            restFullApi.sendPost('getFilesList', avpzData)
                .then(function(storageList){
                    $scope.isLoading = false;
                    $scope.storageList = storageList.data;
                });
        }
        getFilesList();
        $scope.deleteFile = function (fileName) {
            avpzData.fileName = fileName;
            avpzData.oneFileDelete = 1;
            restFullApi.sendPost('deleteFiles', avpzData)
                .then(function(storageList){
                    getFilesList();
                    Notification.success({message: 'Продовжуйте роботу з системою', title: 'Файл - '+ fileName +' успішно видалено'});
                });
        };
        $scope.deleteAll = function () {
            avpzData.oneFileDelete = 0;
            avpzData.fileNamesArr = $scope.storageList;
            restFullApi.sendPost('deleteFiles', avpzData)
                .then(function(storageList){
                    getFilesList();
                    Notification.success({message: 'Продовжуйте роботу з системою', title: 'Усі файли успішно видалено'});
                });
        };

    });