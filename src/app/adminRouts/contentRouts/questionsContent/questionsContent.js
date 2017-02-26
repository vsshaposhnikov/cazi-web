angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('questionsContent', {
                url: '/questionsContent',
                templateUrl: 'app/adminRouts/contentRouts/questionsContent/questionsContent.html',
                controller: 'questionsContentController',
                roles: ['admin']
            });
    });
