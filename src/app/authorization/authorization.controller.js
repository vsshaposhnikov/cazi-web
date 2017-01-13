'use strict';
angular.module('caziWeb')
    .controller('authorizationController', function($scope, $state, Notification, restFullApi, $rootScope, localStorageService){
        $scope.userData = {};
        $rootScope.isLoading = true;

        $scope.login = function (form) {
            if(form.$valid){
                restFullApi.sendPost('login', $scope.userData)
                    .then(function(user){
                            $scope.getAllMerchantPointsByUser = function () {
                                restFullApi.sendPost('getAllMerchantPointsByUser', $rootScope.userInfo)
                                .then(function(points){
                                    $rootScope.isLoading = false;
                                    if(points != undefined){
                                        //console.log(points);
                                        $rootScope.merchantPoints = points.data;
                                        $rootScope.selectedPoint = points.data[0];
                                        localStorageService.set('points', points.data);
                                        localStorageService.set('selectedPoint', points.data[0]);
                                    }
                                })
                            };
                            if(user != undefined){
                                $rootScope.userInfo = user.data;
                                if($rootScope.userInfo.role === 'admin') {
                                    localStorageService.set('user', $rootScope.userInfo);
                                    $scope.getAllMerchantPointsByUser();
                                    $rootScope.isLoading = false;
                                    $state.go('statistics');
                                }
                                else {
                                    $state.go('authorization');
                                    Notification.error({message: 'Не достаточно прав доступа!', title: 'Ошибка авторизации'});
                                }
                            }
                    })
            }
        };

    });