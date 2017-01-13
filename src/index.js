angular
    .module('caziWeb', ['ui.router', 'ui-notification', 'LocalStorageModule', 'ngMessages', 'ngDialog', 'ngScrollbars'])
    .constant('API_URL', 'http://loyalty-server/api/');
    //.constant('API_URL', 'http://loyalty.devtech.kz/server/public/api/')
    /*.run(function ($rootScope, localStorageService, $location) {
        var user = localStorageService.get('user');

        if (user) {
            $rootScope.userInfo = localStorageService.get('user');
            if ($rootScope.userInfo.role === 'user') {
                if ($location.$$path == "/") {
                    $location.path('userDashboard');
                }
            }
            if ($rootScope.userInfo.role === 'admin') {
                if ($location.$$path == "/") {
                    $location.path('adminDashboard');
                }
            }
        }
        else {
            if ($location.$$path != "/") {
                $location.path('authorization');
            }
        }

        var haveAccess = true;
        $rootScope.$on('$stateChangeStart',
            function (event, toState) {
                if (toState.roles !== undefined && toState.roles.length > 0) {
                    haveAccess = false;
                    if (toState.roles[0] == $rootScope.userInfo.role) {
                        haveAccess = true;
                    }
                    if (haveAccess == false && $rootScope.userInfo.role == 'user') {
                        event.preventDefault();
                        $state.go('userDashboard');
                    }
                    if (haveAccess == false && $rootScope.userInfo.role == 'admin') {
                        event.preventDefault();
                        $state.go('adminDashboard');
                    }
                }
                if (!$rootScope.userInfo) {
                    $location.path('/');
                }
            }
        );


    });
     */
