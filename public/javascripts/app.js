'use strict';

// Declare app level module which depends on filters, and services

var myApp = angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/welcome', {
      templateUrl: '/',
      controller: 'welcomeController'
    }).
    when('/showUser', {
      templateUrl: '/partials/showUsers',
      controller: 'showUserController'
    }).
    when('/addUser', {
      templateUrl: '/partials/addUser',
      controller: 'addUserController'
    }).
    when('/editUser/:user_id', {
      templateUrl: '/partials/editUser',
      controller: 'editUserController'
    }).
    otherwise({
      redirectTo: '/'
    });

  //$locationProvider.html5Mode(true);
});


myApp.factory('userSearch', function($http){
  var result = {};
  $http({
    method: 'GET',
    url: '/api/user'
  }).
      success(function (data, status, headers, config) {
        result.users = data.user_details;
        result.roles = data.permission_list;
      }).
      error(function (data, status, headers, config) {
        result.users = '[]';
        result.roles = '[]';
      });
  return result;
});