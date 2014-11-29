'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
      $scope.name = "Welcome";
  }).
  controller('welcomeController', function ($scope, $http) {
    $scope.name = "Welcome";
  }).
  controller('showUserController', function ($scope, $http, $location, userSearch) {
        $scope.users=userSearch.users;
        $scope.roles=userSearch.roles;

      $http({
        method: 'GET',
        url: '/api/user'
      }).
          success(function (data, status, headers, config) {
            $scope.users = data.user_details;
            $scope.roles = data.permission_list;
          }).
          error(function (data, status, headers, config) {
            $scope.users = '[]';
            $scope.roles = '[]';
          });

        $scope.removeUser = function(id){
            $http.delete('/api/user/'+id).
                success(function(data) {
                    alert(data.message);
                    $location.path('#/welcome');
                });
        }
        //$scope.filterFunction = function(element) {
        //    return element.first_name.match(/^Ma/) ? true : false;
        //};
  }).
  controller('addUserController', function ($scope, $http, $location) {
        $scope.user={};
        //$scope.pw1 = 'passoword';
        $http({
            method: 'GET',
            url: '/api/roles'
        }).
            success(function (data, status, headers, config) {
                //$scope.users = data.user_details;
                $scope.roles = data.permission_list;
            }).
            error(function (data, status, headers, config) {
                //$scope.users = '[]';
                $scope.roles = '[]';
            });
        $scope.submitForm = function(isValid) {
                $http.post('/api/user', $scope.user).
                    success(function(data) {
                        alert(data);
                        $location.path('#/showUser');
                    });
            }
  }).
    controller('editUserController', function($scope, $http, $routeParams, $location){
        $scope.user={};
        //$scope.pw1 = 'passoword';
        $http({
            method: 'GET',
            url: '/api/user/'+$routeParams.user_id
        }).
            success(function (data, status, headers, config) {
                //console.log(data);
                $scope.user = data.user_details;
                $scope.user.role_selected = data.user_details.permission_id;
                //$scope.user_detail = data.user_details;
                $scope.roles = data.permission_list;
            }).
            error(function (data, status, headers, config) {
                //$scope.users = '[]';
                $scope.user = data.user_details;
                $scope.roles = '[]';
            });

        $scope.submitForm = function(isValid) {
            $scope.user['id']=$routeParams.user_id;
            $http.put('/api/user', $scope.user).
                success(function(data) {
                    //console.log(data);
                    alert(data.message);
                    $location.path('/showUser');
                });
        }
    });