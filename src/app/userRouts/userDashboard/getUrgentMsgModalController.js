'use strict';
angular.module('caziWeb')
    .controller('getUrgentMsgModalController', function($scope, urgentMsg){
        $scope.urgentMsg = urgentMsg;
    });