angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('userDashboard', {
                url: '/userDashboard',
                templateUrl: 'app/userRouts/userDashboard/userDashboard.html',
                controller: 'userDashboardController',
                roles: ['user']
            });
    });
