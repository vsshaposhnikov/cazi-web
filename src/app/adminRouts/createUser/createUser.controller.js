'use strict';
angular.module('caziWeb')
    .controller('createUserController', function($scope, restFullApi, $rootScope, localStorageService, $state, Notification, $timeout){

        $scope.stepsForSwitch = ['firstStep', 'secondStep', 'thirdStep', 'lastStep'];

        $scope.counter = 2;

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
                name: 'Крок 3: Статистика',
                class: 'thirdStep'
            },
            {
                name: 'Крок 4: Створити',
                class: 'fourthStep'
            }
        ];

        var userData = {
            token: localStorageService.get('user').token
        };
        $scope.getChoice = function (choice, whoseChoice) {
            switch (whoseChoice) {
                case 'gov':
                console.log(whoseChoice, choice.organizationName);
                return $scope.selectedGov = choice;
                break;
                case 'region':
                console.log(whoseChoice, choice.regionName);
                return $scope.selectedRegion = choice;
                break;
                case 'vendor':
                console.log(whoseChoice, choice.vendorName);
                return $scope.selectedVendor = choice;
                break;
            }
        };
        $scope.getAvpzList = function () {
            restFullApi.sendPost('getAvpzList', userData)
                .then(function(avpzList){
                    avpzList != undefined ? $scope.avpzList = avpzList.data : $scope.avpzList = null;
                })
        };
        $scope.getAvpzList();
        $scope.getGovOrganizationList = function () {
            restFullApi.sendPost('getGovOrganizationList', userData)
                .then(function(govOrganizationList){
                    //console.log(govOrganizationList);
                    $scope.selectedGov = govOrganizationList.data[0];
                    govOrganizationList != undefined ? $scope.govOrganizationList = govOrganizationList.data : $scope.govOrganizationList = null;
                })
        };
        $scope.getGovOrganizationList();
        $scope.getRegionsList = function () {
            restFullApi.sendPost('getRegionsList', userData)
                .then(function(regionsList){
                    //console.log(govOrganizationList);
                    $scope.selectedRegion = regionsList.data[0];
                    regionsList != undefined ? $scope.regionsList = regionsList.data : $scope.regionsList = null;
                })
        };
        $scope.getRegionsList();
        $scope.getAllAvpzVendors = function () {
            restFullApi.sendPost('getAllAvpzVendors', userData)
                .then(function(vendorsList){
                    //console.log(govOrganizationList);
                    $scope.selectedVendor = vendorsList.data[0];
                    vendorsList != undefined ? $scope.vendorsList = vendorsList.data : $scope.vendorsList = null;
                })
        };
        $scope.getAllAvpzVendors();

        $scope.newUserData = {
            userInfo: {
                avpzArray: []
            }
        };
        $scope.avpzListForShow = [];


        $scope.chooseAvpz = function (avpzId) {
            $scope.avpzListForShow.push(avpzId);
            $scope.newUserData.userInfo.avpzArray.push(avpzId.id);
        };

        $scope.createNewUser = function () {
            $scope.newUserData.token = localStorageService.get('user').token;
            $scope.newUserData.userInfo.creator =   localStorageService.get('user').firstName
                +' '+
                localStorageService.get('user').lastName;
            //console.log($scope.newUserData);

            restFullApi.sendPost('createOrUpdateUser', $scope.newUserData)
                .then(function(createdUser){
                    //console.log(createdUser);
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