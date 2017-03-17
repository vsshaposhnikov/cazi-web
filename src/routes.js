angular
  .module('caziWeb')
  .config(routesConfig, NotificationProvider, localStorageServiceProvider);

/** @ngInject */
function routesConfig($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');
}
function NotificationProvider() {
    NotificationProvider.setOptions({
        delay: 30000,
        startTop: 20,
        startRight: 20
    });
}
function localStorageServiceProvider() {
    localStorageServiceProvider
        .setPrefix('caziWeb')
        .setStorageType('sessionStorage')
        .setNotify(true, true)
}
