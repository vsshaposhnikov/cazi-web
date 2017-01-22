angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('usersList', {
                url: '/usersList',
                templateUrl: 'app/adminRouts/usersList/usersList.html',
                controller: 'usersListController',
                roles: ['admin']
            });
    });
