'use strict';
angular.module('caziWeb')
    .controller('statisticsController', function($scope, restFullApi, localStorageService){
        $scope.isLoading = true;
        var date = new Date(),
            statistInfo = {
                token: localStorageService.get('user').token
            };
        $scope.statisticsData = {
            pie:{
                colors: ['#fcb315', '#288fc4', '#515150'],
                labels: ["За рік", "За місяць", "За сьогодні"],
                options: {
                    responsive: false,
                    legend: {
                        display: true
                    },
                    tooltips: {
                        bodyFontSize: 14
                    }
                }
            },
            govCounter: {
                currentDate: date.getDate() +'/' + (date.getMonth() + 1 ) +'/'+ date.getFullYear(),
                counter: 0,
                count: null
            },
            base: {
                colors: ['#515150'],
                labels: null,
                options: {
                    tooltips: {
                        bodyFontSize: 14
                    }
                }
            }
        };
        $scope.data = [2, 2, 1];

        function getUserCreationInfo() {
            restFullApi.sendPost('getUserCreationInfo', statistInfo)
                .then(function(pieInfo){
                    $scope.isLoading = false;
                    console.log(pieInfo.data);
                    $scope.statisticsData.pie.data = pieInfo.data;
                });
        }
        getUserCreationInfo();
        function getCountGovOrganizations() {
            restFullApi.sendPost('getCountGovOrganizations', statistInfo)
                .then(function(govCounter){
                    $scope.isLoading = false;
                    console.log(govCounter.data);
                    $scope.statisticsData.govCounter.count = govCounter.data;
                });
        }
        getCountGovOrganizations();
        function getActiveUsers() {
            restFullApi.sendPost('getActiveUsers', statistInfo)
                .then(function(activeUsers){
                    $scope.isLoading = false;
                    console.log(activeUsers.data);
                    $scope.statisticsData.base.labels = activeUsers.data.labels;
                    $scope.statisticsData.base.data = activeUsers.data.data;
                });
        }
        getActiveUsers();
    });