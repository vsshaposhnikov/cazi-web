angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('legalBase', {
                url: '/legalBase',
                templateUrl: 'app/commonRouts/legalBase/legalBase.html',
                controller: 'legalBaseController'
            });
    });
