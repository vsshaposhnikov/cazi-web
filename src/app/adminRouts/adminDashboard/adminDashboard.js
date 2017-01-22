angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('adminDashboard', {
                url: '/adminDashboard',
                templateUrl: 'app/adminRouts/adminDashboard/adminDashboard.html',
                controller: 'adminDashboardController',
                roles: ['admin']

            })
    });
