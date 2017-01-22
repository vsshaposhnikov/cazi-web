angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/commonRouts/profile/profile.html',
                controller: 'profileController'
            });
    });
