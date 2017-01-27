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
                    avpzList != undefined ? $scope.avpzList = avpzList.data : $scope.avpzList = null;
                })
        };
        $scope.getAvpzList();


        $scope.newUserData = {};
        $scope.newUserData.avpzArray = [];
        $scope.avpzListForShow = [];


        $scope.chooseAvpz = function (avpzId) {
            $scope.avpzListForShow.push(avpzId);
            $scope.newUserData.avpzArray.push(avpzId.id);
        };

        $scope.createNewUser = function () {
            $scope.newUserData.token = localStorageService.get('user').token;
            $scope.newUserData.role = 'user';
            $scope.newUserData.userInfo.creator =   localStorageService.get('user').userInfo.firstName
                +' '+
                localStorageService.get('user').userInfo.lastName;
            restFullApi.sendPost('createOrUpdateUser', $scope.newUserData)
                .then(function(createdMerchantPointInfo){
                    console.log(createdMerchantPointInfo);
                    $state.go('usersList');
                    Notification.success({message: 'Вітаю, нового користувача створено!'});
                })
        };

        $scope.prevStep = function () {
            $scope.counter--;
            $scope.createUserSwitch = $scope.stepsForSwitch[$scope.counter];
                $scope.newUserData.avpzArray = [];
                $scope.avpzListForShow = [];
        };
        $scope.cancel = function () {
            $state.go('usersList');
        };
        $scope.nextStep = function () {
            $scope.counter++;
            $scope.createUserSwitch = $scope.stepsForSwitch[$scope.counter];
        };


});