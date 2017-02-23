'use strict';
angular.module('caziWeb')
    .controller('editAvpzModalController', function($scope, FileUploader, API_URL, restFullApi, avpz, localStorageService, Notification, ngDialog, $state){
        $scope.avpz = avpz;
        var avpzData = {
            token: localStorageService.get('user').token
        };
        $scope.deleteAvpz = function () {
            avpzData.id = avpz.id;
                restFullApi.sendPost('deleteAvpz', avpzData)
                .then(function(avpzList){
                    if(avpzList.data == true){
                        Notification.success({message: 'Продовжуйте роботу з системою.', title: 'АВПЗ успішно видалено.'});
                        $state.reload();
                    }
                });
        };
        $scope.editAvpz = function () {
            avpzData.avpzInfo = avpz;
            restFullApi.sendPost('createOrUpdateAvpz', avpzData)
                .then(function(avpzList){
                    if(avpzList.data == true){
                        Notification.success({message: 'Продовжуйте роботу з системою.', title: 'Назву АВПЗ успішно змінено.'});
                        $state.reload();
                    }
                });
        };

        var uploader = $scope.uploader = new FileUploader({
            url: API_URL+'createOrUpdateAvpz'
        });
        $scope.uploadSignature = function () {

            uploader.filters.push({
                name: 'syncFilter',
                fn: function(item, options) {
                    //console.log('syncFilter');
                    return this.queue.length < 10;
                }
            });
            uploader.onBeforeUploadItem = function(item, filter, options) {
                var formData = [{
                    token: avpzData.token,
                    id: avpz.id
                }];
                Array.prototype.push.apply(item.formData, formData);
            };
            uploader.onWhenAddingFileFailed = function(item, filter, options) {
                console.info('onWhenAddingFileFailed', item, filter, options);
            };
            uploader.onAfterAddingFile = function(fileItem) {
                console.info('onAfterAddingFile', fileItem);
            };
            uploader.onProgressItem = function(fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                console.info('onErrorItem', fileItem, response, status, headers);
            };
            uploader.onCompleteItem = function(fileItem, response, status, headers) {
                console.info(response);
            };
            uploader.uploadAll();
            Notification.success({message: 'Продовжуйте роботу з системою.', title: 'Антивірусну сигнатуру для '+ avpz.title +' успішно завантажено.'});
            ngDialog.close();
        };


    });