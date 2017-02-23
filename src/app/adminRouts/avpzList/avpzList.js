angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('avpzList', {
                url: '/avpzList',
                templateUrl: 'app/adminRouts/avpzList/avpzList.html',
                controller: 'avpzListController',
                roles: ['admin']
            });
    });
