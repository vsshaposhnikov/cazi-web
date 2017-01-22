angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('avpzList', {
                url: '/avpzList',
                templateUrl: 'app/commonRouts/avpzList/avpzList.html',
                controller: 'avpzListController'
            });
    });
