angular.module('caziWeb')
    .directive('dropDown', function() {
        return {
            restrict: 'EA',
            link: function (scope, element, attrs) {
                $(document).click(function(){
                    element.removeClass('opened');
                });
                $(element).click(function(e){
                    e.stopPropagation();
                    element.toggleClass('opened');
                })
            }
        };
    });