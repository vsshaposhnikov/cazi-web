'use strict';
angular.module('caziWeb')
    .controller('govCreateController', function($scope, restFullApi, localStorageService, Notification){
        $scope.govInfo = {
            token: localStorageService.get('user').token
        };
        $scope.createNewGov = function () {
            //console.log($scope.regionsList);
            restFullApi.sendPost('createGovOrganization', $scope.govInfo)
                .then(function(govInfo){
                    //console.log(govInfo);
                    $scope.govOrganizationList.push(govInfo.data);
                    Notification.success({title: 'Вітаю, нову організацію створено!'});
                    $scope.closeThisDialog();
                })
        };
    });