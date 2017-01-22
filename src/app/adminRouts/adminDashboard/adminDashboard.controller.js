'use strict';
angular.module('caziWeb')
    .controller('adminDashboardController', function($scope, restFullApi, localStorageService){
        $scope.userData = {
            token:  localStorageService.get('user').token,
            login: 'Vladik',
            id: 3,
            password: 'Vladik',
            email: 'Vladik@mail.com',
            userInfo: {
                firstName: 'Vladik Иванович',
                lastName: 'Козлов',
                organization: 'DDDWEWE',
                position: 'Специалист',
                phone: '2323233',
                creator: localStorageService.get('user').userInfo.lastName
            }
        };


        $scope.click = function () {
            restFullApi.sendPost('createOrUpdateUser', $scope.userData)
                .then(function(user){
                    console.log(user.data);

                })
        }

    });