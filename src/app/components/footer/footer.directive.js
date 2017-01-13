angular.module('caziWeb')
    .directive('footer', function() {
        return {
            templateUrl: 'app/components/footer/footer.html',
            restrict: 'E',
            controller: 'footerController'
        };
    });