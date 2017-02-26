'use strict';
angular.module('caziWeb')
    .controller('editQuestionModalController', function($scope, FileUploader, API_URL, question, restFullApi, localStorageService, Notification, ngDialog, $state){
        $scope.questionData = {
            token: localStorageService.get('user').token,
            questionInfo: question
        };
        $scope.deleteQuestion = function () {
                restFullApi.sendPost('deleteQuestionsAnswers', $scope.questionData)
                .then(function(deletedQuestion){
                    if(deletedQuestion.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Нову пару успішно видалено'});
                        $state.reload();
                    }
                });
        };
        $scope.editQuestion = function () {
            $scope.questionData.questionInfo.edit = 1;
            //console.log($scope.questionData);
                restFullApi.sendPost('createOrUpdateQuestionsAnswers', $scope.questionData)
                .then(function(deletedQuestion){
                    if(deletedQuestion.data){
                        Notification.success({message: 'Продовжуйте роботу з системою', title: 'Пару успішно відредаговано'});
                        $state.reload();
                    }
                });
        };
    });