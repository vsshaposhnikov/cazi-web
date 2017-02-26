'use strict';
angular.module('caziWeb')
    .controller('editAvpzModalController', function($scope, FileUploader, API_URL, restFullApi, avpz, localStorageService, Notification, ngDialog, $state){
        $scope.avpz = avpz;
        $scope.buttonFlag = true;
        var avpzData = {
            token: localStorageService.get('user').token
        };
        $scope.createAvpz = function () {
                restFullApi.sendPost('createOrUpdateAvpz', avpzData)
                .then(function(newAvpz){
                    Notification.success({message: 'Продовжуйте роботу з системою.', title: 'Нове АВПЗ успішно додано.'});
                    $state.reload();
                });
        };
        $scope.deleteAvpz = function () {
            avpzData.id = avpz.id;
                restFullApi.sendPost('deleteAvpz', avpzData)
                .then(function(avpzList){
                    if(avpzList.data == true){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'АВПЗ '+ avpz.title +' успішно видалено'});
                        $state.reload();
                    }
                });
        };
        $scope.editAvpz = function () {
            avpzData.avpzInfo = avpz;
            avpzData.avpzInfo.createTitle = 0;
            restFullApi.sendPost('createOrUpdateAvpz', avpzData)
                .then(function(avpzList){
                    if(avpzList.data == true){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Назву АВПЗ успішно змінено'});
                        $state.reload();
                    }
                });
        };

        $scope.closeModalWithReload = function () {
            $state.reload();
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
                    id: avpz.id,
                    exe: 0
                }];
                Array.prototype.push.apply(item.formData, formData);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                //console.info('onErrorItem', fileItem, response, status, headers);
                Notification.error({message: response, title: 'Помилка завантаження файлу.'});
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                //console.info(response);
                Notification.success({message: 'Антивірусну сигнатуру для '+ avpz.title +' успішно завантажено', title: 'Продовжуйте роботу з системою'});
                $scope.buttonFlag = false;
            };
            uploader.uploadAll();
        };
        $scope.uploadExe = function () {

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
                    id: avpz.id,
                    exe: 1
                }];
                Array.prototype.push.apply(item.formData, formData);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                //console.info('onErrorItem', fileItem, response, status, headers);
                Notification.error({message: response, title: 'Помилка завантаження файлу'});
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                //console.info(response);
                Notification.success({message: 'Інсталяційний файл для '+ avpz.title +' успішно завантажено', title: 'Продовжуйте роботу з системою'});
                $scope.buttonFlag = false;
            };
            uploader.uploadAll();
        };


    });