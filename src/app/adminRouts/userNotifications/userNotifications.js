angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('userNotifications', {
                url: '/userNotifications',
                templateUrl: 'app/adminRouts/userNotifications/userNotifications.html',
                controller: 'userNotificationsController',
                roles: ['admin']
            });
    });
