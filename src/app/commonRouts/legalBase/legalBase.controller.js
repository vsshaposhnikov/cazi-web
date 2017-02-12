'use strict';
angular.module('caziWeb')
    .controller('legalBaseController', function($scope, localStorageService, restFullApi){
        $scope.getLegalBase = function () {
            restFullApi.sendPost('getLegalBase', '')
                .then(function(legalBase){
                    //console.log(questionsAnswers);
                    $scope.legalBase = legalBase.data;
                })
        };
        $scope.getLegalBase();
    });