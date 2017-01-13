angular.module('caziWeb')
    .directive('navigation', function() {
        return {
            templateUrl: 'app/components/navigation/navigation.html',
            restrict: 'E',
            controller: 'navigationController'
        };
    });