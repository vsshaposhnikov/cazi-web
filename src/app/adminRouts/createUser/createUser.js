angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('createUser', {
                url: '/createUser',
                templateUrl: 'app/adminRouts/createUser/createUser.html',
                controller: 'createUserController',
                roles: ['admin']
            });
    });
