angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('authorization', {
                url: '/',
                templateUrl: 'app/authorization/authorization.html',
                controller: 'authorizationController'
            });
    });
