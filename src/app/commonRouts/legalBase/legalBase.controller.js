'use strict';
angular.module('caziWeb')
    .controller('legalBaseController', function($scope, localStorageService, restFullApi){
        $scope.getLegalBase = function () {
            $scope.tokenObj = {
                token: localStorageService.get('user').token
            };
            restFullApi.sendPost('getLegalBase', $scope.tokenObj)
                .then(function(legalBase){
                    //console.log(questionsAnswers);
                    $scope.legalBase = legalBase.data;
                })
        };
        $scope.getLegalBase();
    });