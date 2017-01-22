angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('statistics', {
                url: '/statistics',
                templateUrl: 'app/adminRouts/statistics/statistics.html',
                controller: 'statisticsController',
                roles: ['admin']
            });
    });
