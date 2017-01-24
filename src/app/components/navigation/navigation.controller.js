angular.module('caziWeb')
  .controller('navigationController', function($scope, $state) {
    $scope.menu = [
      {
        'title': 'Запитання та відповіді',
        'state': 'questionsAnswers'
      },
      {
       'title': 'Перелік АВПЗ',
       'state': 'nomenclature'
       },
      {
        'title': 'Нормативна база',
        'state': 'legalBase'
      },
      {
        'title': 'Контакти',
        'state': 'contacts'
      }
    ];
  });