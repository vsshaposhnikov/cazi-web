angular
    .module('caziWeb', ['ui.router', 'ui-notification', 'LocalStorageModule', 'ngMessages', 'ngDialog', 'ngScrollbars'])
    //.constant('API_URL', 'http://cazi-server/api/')
    .constant('API_URL', 'http://10.10.11.47/server/public/api/')
    .run(function ($rootScope, localStorageService, $location, $state) {
        var user = localStorageService.get('user');

        if (user) {

            $rootScope.user = localStorageService.get('user');
            if ($rootScope.user.role === 'user') {
                if ($location.$$path == "/") {
                    $location.path('userDashboard');
                }
            }
            if ($rootScope.user.role === 'admin') {
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
            function (event, toState, toParams, fromState, fromParams) {
                if (toState.roles !== undefined && toState.roles.length > 0 && $rootScope.user != null) {
                    haveAccess = false;
                    if (toState.roles[0] == $rootScope.user.role) {
                        haveAccess = true;
                    }
                    if (haveAccess == false && $rootScope.user.role == 'user') {
                        event.preventDefault();
                        $state.go('userDashboard');
                    }
                    if (haveAccess == false && $rootScope.user.role == 'admin') {
                        event.preventDefault();
                        $state.go('adminDashboard');
                    }
                }
                if ($rootScope.user && toState.name=='authorization') {

                    if ($rootScope.user.role == 'user') {
                        event.preventDefault();
                        $state.go('userDashboard');
                    }
                    if ($rootScope.user.role == 'admin') {
                        event.preventDefault();
                        $state.go('adminDashboard');
                    }
                }
            }
        );

        $rootScope.validationPatterns = {
            emailCheck: "^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@([a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*",
            textCheck: "^[а-яА-ЯёЁa-zA-Z ]+$"
        };
    });
