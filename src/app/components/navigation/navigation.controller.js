angular.module('caziWeb')
  .controller('navigationController', function($scope) {
    $scope.menu = [
      {
        'title': 'Запитання та відповіді',
        'state': 'questionsAnswers'
      },
      {
       'title': 'Перелік АВПЗ',
       'state': 'avpzList'
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