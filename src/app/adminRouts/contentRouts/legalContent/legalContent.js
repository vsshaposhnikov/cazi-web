angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('legalContent', {
                url: '/legalContent',
                templateUrl: 'app/adminRouts/contentRouts/legalContent/legalContent.html',
                controller: 'legalContentController',
                roles: ['admin']
            });
    });
