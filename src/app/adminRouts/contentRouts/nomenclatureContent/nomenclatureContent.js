angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('nomenclatureContent', {
                url: '/nomenclatureContent',
                templateUrl: 'app/adminRouts/contentRouts/nomenclatureContent/nomenclatureContent.html',
                controller: 'nomenclatureContentController',
                roles: ['admin']
            });
    });
