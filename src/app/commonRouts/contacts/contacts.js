angular
  .module('caziWeb')
    .config(function($stateProvider) {
        $stateProvider
            .state('contacts', {
                url: '/contacts',
                templateUrl: 'app/commonRouts/contacts/contacts.html',
                controller: 'contactsController'
            });
    });
