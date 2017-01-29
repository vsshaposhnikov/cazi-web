'use strict';
angular.module('caziWeb')
    .controller('questionsAnswersController', function(restFullApi, $scope, localStorageService){
        $scope.getQuestionsAnswers = function () {
            $scope.tokenObj = {
                token: localStorageService.get('user').token
            };
            restFullApi.sendPost('getQuestionsAnswers', $scope.tokenObj)
                .then(function(questionsAnswers){
                    //console.log(questionsAnswers);
                    $scope.questionsAnswers = questionsAnswers.data;
                })
        };
        $scope.getQuestionsAnswers();
    });