angular.module('caziWeb')
  .controller('headerController', function($scope, $state, localStorageService, restFullApi, $rootScope) {
    $scope.issetUser = localStorageService.get('user');
      $scope.logout = function () {
          restFullApi.sendPost('logout', $scope.issetUser)
              .then(function(exit){
                  //console.log(exit);
                  localStorageService.remove('user');
                  $rootScope.user = null;
                  $state.go('authorization');

              })
      };
  });