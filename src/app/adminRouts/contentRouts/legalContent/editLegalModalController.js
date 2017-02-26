'use strict';
angular.module('caziWeb')
    .controller('editLegalModalController', function($scope, FileUploader, API_URL, legal, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.legalBaseData = {
            token: localStorageService.get('user').token,
            legalBaseInfo: legal
        };
        $scope.buttonFlag = true;
        $scope.deleteLegal = function () {
                restFullApi.sendPost('deleteLegalBase', $scope.legalBaseData)
                .then(function(deletedLegal){
                    if(deletedLegal.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Запис успішно видалено'});
                        $state.reload();
                    }
                });
        };
        $scope.editLegal = function () {
            $scope.legalBaseData.legalBaseInfo.edit = 1;
            //console.log($scope.questionData);
                restFullApi.sendPost('createOrUpdateLegalBase', $scope.legalBaseData)
                .then(function(editedLegal){
                    if(editedLegal.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Запис успішно відредаговано'});
                        $state.reload();
                    }
                });
        };
        var uploader = $scope.uploader = new FileUploader({
            url: API_URL+'uploadLegalBaseAttachment'
        });
        $scope.uploadAttachment = function () {

            uploader.filters.push({
                name: 'syncFilter',
                fn: function(item, options) {
                    //console.log('syncFilter');
                    return this.queue.length < 10;
                }
            });
            uploader.onBeforeUploadItem = function(item, filter, options) {
                var formData = [{
                    token: $scope.legalBaseData.token,
                    id: $scope.legalBaseData.legalBaseInfo.id
                }];
                Array.prototype.push.apply(item.formData, formData);
            };
            uploader.onErrorItem = function(fileItem, response, status, headers) {
                //console.info('onErrorItem', fileItem, response, status, headers);
                Notification.error({message: response, title: 'Помилка завантаження файлу.'});
            };
            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                //console.info(response);
                Notification.success({message: 'Додаток успішно завантажено', title: 'Продовжуйте роботу з системою'});
                $scope.buttonFlag = false;
            };
            uploader.uploadAll();
        };
    });