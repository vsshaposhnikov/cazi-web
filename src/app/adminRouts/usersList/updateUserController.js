'use strict';
angular.module('caziWeb')
    .controller('updateUserController', function($scope, restFullApi, localStorageService, user, $state, $q, ngDialog, Notification){
        //$scope.isLoading = true;
        //console.log(user);
        $scope.active = 0;
        $scope.userData = {
            token: localStorageService.get('user').token,
            userInfo: user
        };


        $scope.updateUserSwitch = 'userInfo';

        var avpzData = {
            token: localStorageService.get('user').token,
            userInfo: {
                id: user.id
            }
        };

        $q.all([restFullApi.sendPost('getAvpzList', avpzData), restFullApi.sendPost('getAvpzListByUser', avpzData)]).then(function(data){
            $scope.avpzList = data[0] != undefined ? data[0].data : [];
            //console.log($scope.avpzList);
            var avpzListByUser = data[1] != undefined ? data[1].data : [];
            $scope.avpzList.map(function(avp){
                avp.isUsed = false;
            });
            avpzListByUser.map(function(avp){
                //console.log(avp);
                var index = _.findIndex($scope.avpzList, { 'id': avp.avpzId});
                if(index > -1){
                    $scope.avpzList[index].isUsed = true;
                }
            });
        });

        $scope.setActive = function () {
            $scope.userData = {
                token: localStorageService.get('user').token,
                id: $scope.userData.userInfo.id
            };
            restFullApi.sendPost('setActive', $scope.userData)
                .then(function(active){
                    //console.log(active.data);
                    Notification.success({message: active.data, title: 'Вітаю, користувача  оновлено!'});
                    $state.reload();
                    $scope.isLoading = false;
                })
        };

        var userData = {
            token: localStorageService.get('user').token
        };
        $scope.getGovOrganizationList = function () {
            restFullApi.sendPost('getGovOrganizationList', userData)
                .then(function(govOrganizationList){
                    //console.log(govOrganizationList);
                    $scope.selectedGov = user.govId != null ? _.filter(govOrganizationList.data, {'id' : user.govId}).map(function(gov){return gov})[0] : govOrganizationList.data[0];
                    govOrganizationList != undefined ? $scope.govOrganizationList = govOrganizationList.data : $scope.govOrganizationList = null;
                })
        };
        $scope.getGovOrganizationList();
        $scope.getRegionsList = function () {
            restFullApi.sendPost('getRegionsList', userData)
                .then(function(regionsList){
                    //console.log(regionsList.data[0]);
                    $scope.selectedRegion = user.regionId != null ? _.filter(regionsList.data, {'id' : user.regionId}).map(function(region){return region})[0] : regionsList.data[0];
                    regionsList != undefined ? $scope.regionsList = regionsList.data : $scope.regionsList = null;
                })
        };
        $scope.getRegionsList();
        $scope.getAllAvpzVendors = function () {
            restFullApi.sendPost('getAllAvpzVendors', userData)
                .then(function(vendorsList){
                    //console.log(vendorsList);
                    //$scope.selectedVendor = vendorsList.data[0];
                    $scope.selectedVendor = user.vendorId != null ? _.filter(vendorsList.data, {'id' : user.vendorId}).map(function(vendor){return vendor})[0] : vendorsList.data[0];
                    vendorsList != undefined ? $scope.vendorsList = vendorsList.data : $scope.vendorsList = null;
                })
        };
        $scope.getAllAvpzVendors();

        $scope.getChoice = function (choice, whoseChoice) {
            switch (whoseChoice) {
                case 'gov':
                    //console.log(whoseChoice, choice.organizationName);
                    return $scope.selectedGov = choice;
                    break;
                case 'region':
                    //console.log(whoseChoice, choice.regionName);
                    return $scope.selectedRegion = choice;
                    break;
                case 'vendor':
                    //console.log(whoseChoice, choice.vendorName);
                    return $scope.selectedVendor = choice;
                    break;
            }
        };

        $scope.updateUser = function () {
            $scope.userData.userInfo.avpzArray = _.filter($scope.avpzList, {'isUsed' : true}).map(function(avp){return avp.id});
            $scope.userData.userInfo.statistics = {
                govId: $scope.selectedGov.id,
                regionId: $scope.selectedRegion.id,
                vendorId: $scope.selectedVendor.id,
            };
            //console.log($scope.userData);
            restFullApi.sendPost('createOrUpdateUser', $scope.userData)
                .then(function(updatedUser){
                    //console.log(updatedUser);
                    Notification.success({message: updatedUser.data, title: 'Вітаю, користувача  оновлено!'});
                    $scope.users = updatedUser != undefined ? updatedUser.data : null;
                    $state.reload();
                })
        };

        $scope.openGovModal = function () {
            ngDialog.open({
                template: 'app/modalTemplates/createGovOrganization.html',
                showClose: false,
                controller: 'govCreateController',
                width: '55%',
                closeByNavigation: true,
                scope: $scope
            });
        };

    });