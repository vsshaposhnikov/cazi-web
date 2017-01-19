angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('userDashboard', {
                url: '/userDashboard',
                templateUrl: 'app/userDashboard/userDashboard.html',
                controller: 'userDashboardController'
            });
    });
