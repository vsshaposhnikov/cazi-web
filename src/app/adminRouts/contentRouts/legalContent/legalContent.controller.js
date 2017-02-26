'use strict';
angular.module('caziWeb')
    .controller('legalContentController', function($scope, restFullApi, localStorageService, ngDialog){
        $scope.isLoading = true;
        function getLeagalBase() {
            restFullApi.sendPost('getLegalBase', {})
                .then(function(legalBase){
                    $scope.isLoading = false;
                    $scope.legalBase = legalBase.data;
                });
        }
        getLeagalBase();
        $scope.openCreateModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/legalBaseModals/createLegal.html',
                showClose: false,
                controller: 'createLegalModalController',
                width: '55%',
                closeByNavigation: true
            });
        };
        $scope.openDeleteModal = function (legal) {
            ngDialog.open({
                template: 'app/modalTemplates/legalBaseModals/deleteLegal.html',
                showClose: false,
                controller: 'editLegalModalController',
                width: '40%',
                closeByNavigation: true,
                resolve: {
                    legal: function() {
                        return legal;
                    }
                }
            });
        };
        $scope.openEditModal = function (legal) {
            ngDialog.open({
                template: 'app/modalTemplates/legalBaseModals/editLegal.html',
                showClose: false,
                controller: 'editLegalModalController',
                width: '55%',
                closeByNavigation: true,
                resolve: {
                    legal: function() {
                        return legal;
                    }
                }
            });
        };
        $scope.openUploadModal = function (legal) {
            ngDialog.open({
                template: 'app/modalTemplates/legalBaseModals/uploadAttachment.html',
                showClose: false,
                controller: 'editLegalModalController',
                width: '55%',
                closeByNavigation: true,
                resolve: {
                    legal: function() {
                        return legal;
                    }
                }
            });
        };
    });