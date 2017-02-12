'use strict';
angular.module('caziWeb')
    .controller('questionsAnswersController', function(restFullApi, $scope, localStorageService){
        $scope.getQuestionsAnswers = function () {
            restFullApi.sendPost('getQuestionsAnswers', '')
                .then(function(questionsAnswers){
                    //console.log(questionsAnswers);
                    $scope.questionsAnswers = questionsAnswers.data;
                })
        };
        $scope.getQuestionsAnswers();
    });