'use strict';
angular.module('caziWeb')
    .controller('createUserController', function($scope, restFullApi, $rootScope, localStorageService, $state, Notification){

        $scope.stepsForSwitch = ['firstStep', 'secondStep', 'thirdStep'];

        $scope.counter = 0;

        $scope.createUserSwitch = $scope.stepsForSwitch[$scope.counter];

        $scope.steps = [
            {
                name: 'Крок 1: Користувач',
                class: 'firstStep'
            },
            {
                name: 'Крок 2: АВПЗ',
                class: 'secondStep'
            },
            {
                name: 'Крок 3: Створити',
                class: 'thirdStep'
            }
        ];

        $scope.tokenObj = {
            token: localStorageService.get('user').token
        };
        $scope.getAvpzList = function () {
            restFullApi.sendPost('getAvpzList', $scope.tokenObj)
                .then(function(avpzList){
                    console.log(avpzList);
                    avpzList != undefined ? $scope.avpzList = avpzList.data : $scope.avpzList = null;


                    Notification.success({message: 'Первый шаг успешно выполнен!'});

                })
        };
        $scope.getAvpzList();

        $scope.prevStep = function () {
            $scope.counter--;
            $scope.createUserSwitch = $scope.stepsForSwitch[$scope.counter];
        };


        $scope.cancel = function () {
            $state.go('adminDashboard');
        };

        $scope.newUserData = {
        };
        $scope.createFirstStep = function () {
            $scope.newUserData.token = localStorageService.get('user').token;
            $scope.newUserData.role = 'user';
            $scope.newUserData.userInfo.creator =   localStorageService.get('user').userInfo.firstName
                                                    +' '+
                                                    localStorageService.get('user').userInfo.lastName;
            //console.log($scope.newUserData);


            restFullApi.sendPost('createOrUpdateUser', $scope.newUserData)
                .then(function(createdMerchantPointInfo){
                    console.log(createdMerchantPointInfo);

                        Notification.success({message: 'Первый шаг успешно выполнен!'});

                })
        };


        $scope.nextStep = function () {
            $scope.counter++;
            $scope.createUserSwitch = $scope.stepsForSwitch[$scope.counter];
            if($scope.counter == $scope.stepsForSwitch.length-2){
                //$scope.createFirstStep();
            }
            if($scope.counter == $scope.stepsForSwitch.length-1){
                Notification.success({message: 'Второй шаг успешно выполнен'});
            }
            if($scope.counter == $scope.stepsForSwitch.length-1){
                Notification.success({message: 'Третий шаг успешно выполнен'});
            }
        };


});