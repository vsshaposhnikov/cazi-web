angular
  .module('caziWeb')
  .config(routesConfig, NotificationProvider, localStorageServiceProvider, ScrollBarsProvider);

/** @ngInject */
function routesConfig($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/main');
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
function ScrollBarsProvider () {
    ScrollBarsProvider.defaults = {
        scrollButtons: {
            scrollAmount: 'auto',
            enable: true
        },
        axis: 'y'
    }

}
