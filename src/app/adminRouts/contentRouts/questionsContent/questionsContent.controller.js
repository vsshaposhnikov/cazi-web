'use strict';
angular.module('caziWeb')
    .controller('questionsContentController', function($scope, restFullApi, localStorageService, ngDialog){
        $scope.isLoading = true;
        function getQuestionsAnswers() {
            restFullApi.sendPost('getQuestionsAnswers', {})
                .then(function(questionsAnswers){
                    $scope.isLoading = false;
                    $scope.questionsAnswers = questionsAnswers.data;
                });
        }
        getQuestionsAnswers();
        $scope.openCreateModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/questionsModals/createQuestion.html',
                showClose: false,
                controller: 'createQuestionModalController',
                width: '55%',
                closeByNavigation: true
            });
        };
        $scope.openDeleteModal = function (question) {
            ngDialog.open({
                template: 'app/modalTemplates/questionsModals/deleteQuestion.html',
                showClose: false,
                controller: 'editQuestionModalController',
                width: '40%',
                closeByNavigation: true,
                resolve: {
                    question: function() {
                        return question;
                    }
                }
            });
        };
        $scope.openEditModal = function (question) {
            ngDialog.open({
                template: 'app/modalTemplates/questionsModals/editQuestion.html',
                showClose: false,
                controller: 'editQuestionModalController',
                width: '55%',
                closeByNavigation: true,
                resolve: {
                    question: function() {
                        return question;
                    }
                }
            });
        };
    });