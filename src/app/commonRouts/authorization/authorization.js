angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('authorization', {
                url: '/',
                templateUrl: 'app/commonRouts/authorization/authorization.html',
                controller: 'authorizationController'
            });
    });
