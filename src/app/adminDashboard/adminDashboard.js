angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('adminDashboard', {
                url: '/adminDashboard',
                templateUrl: 'app/adminDashboard/adminDashboard.html',
                controller: 'adminDashboardController'
            });
    });
