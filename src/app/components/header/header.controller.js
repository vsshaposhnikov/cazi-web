angular.module('caziWeb')
  .controller('headerController', function($scope, $state, localStorageService, restFullApi, $rootScope, ngDialog) {
      $scope.logout = function () {
          restFullApi.sendPost('logout', $rootScope.user)
              .then(function(exit){
                  //console.log(exit);
                  localStorageService.remove('user');
                  $rootScope.user = null;
                  $state.go('authorization');
              })
      };
      $scope.openCreateAdminModal = function () {
          ngDialog.open({
              template: 'app/modalTemplates/createAdmin.html',
              showClose: false,
              controller: 'createAdminModalController',
              width: '40%',
              closeByNavigation: true
          });
      }
  });