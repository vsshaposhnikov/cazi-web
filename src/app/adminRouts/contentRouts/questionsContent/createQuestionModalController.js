'use strict';
angular.module('caziWeb')
    .controller('createQuestionModalController', function($scope, FileUploader, API_URL, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.questionData = {
            token: localStorageService.get('user').token,
            questionInfo: {}
        };
        $scope.createNewQuestion = function () {
                restFullApi.sendPost('createOrUpdateQuestionsAnswers', $scope.questionData)
                .then(function(newQuestion){
                    //console.log(newQuestion);
                    if(newQuestion.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Нову пару успішно додано'});
                        $state.reload();
                    }
                });
        };
    });