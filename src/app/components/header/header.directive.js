angular.module('caziWeb')
    .directive('header', function() {
        return {
            templateUrl: 'app/components/header/header.html',
            restrict: 'E',
            controller: 'headerController'
        };
    });