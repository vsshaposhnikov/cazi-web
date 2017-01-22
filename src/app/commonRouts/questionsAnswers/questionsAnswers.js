angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('questionsAnswers', {
                url: '/questionsAnswers',
                templateUrl: 'app/commonRouts/questionsAnswers/questionsAnswers.html',
                controller: 'questionsAnswersController'
            });
    });
