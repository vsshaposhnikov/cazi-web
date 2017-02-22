angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('signatures', {
                url: '/signatures',
                templateUrl: 'app/userRouts/signatures/signatures.html',
                controller: 'signaturesController',
                roles: ['user']
            });
    });
