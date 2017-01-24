angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('nomenclature', {
                url: '/nomenclature',
                templateUrl: 'app/commonRouts/nomenclature/nomenclature.html',
                controller: 'nomenclatureController'
            });
    });
