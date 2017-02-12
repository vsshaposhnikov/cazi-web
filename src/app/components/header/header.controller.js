angular.module('caziWeb')
  .controller('headerController', function($scope, $state, localStorageService, restFullApi, $rootScope) {
      $scope.logout = function () {
          restFullApi.sendPost('logout', $rootScope.user)
              .then(function(exit){
                  //console.log(exit);
                  localStorageService.remove('user');
                  $rootScope.user = null;
                  $state.go('authorization');
              })
      };
  });