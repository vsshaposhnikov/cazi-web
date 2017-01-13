angular.module('caziWeb')
    .directive('preloader', function() {
        return {
            templateUrl: 'app/components/preloader/preloader.html',
            restrict: 'E'
        };
    });