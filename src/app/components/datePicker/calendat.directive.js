'use strict';

angular.module('caziWeb')
.directive('calendar', ['$filter', '$timeout', function ($filter, $timeout) {
	return {
		restrict: 'A',
		scope:{
			mindate: "@",
			maxdate: "@",
		},
		require: 'ngModel',
		link: function (scope, element, attrs, ngModel) {
      var maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 5);
      jQuery.datetimepicker.setLocale('ru');
			$timeout(function() {
				$(element).datetimepicker({
					timepicker: false,
					minDate: scope.mindate || false,
					maxDate: scope.maxdate || maxDate,
					scrollInput: false,
                    yearStart: '2016',
					formatDate:'Y-m-d',
					format: 'Y-m-d',
          dayOfWeekStart: 1,
          yearEnd: maxDate.getFullYear()
				});
				/*ngModel.$formatters.push(function(value) {
					return $filter('date')(value, 'dd.MM.yyyy');
				});*/
			}, 0);
		}
	};
}]);
