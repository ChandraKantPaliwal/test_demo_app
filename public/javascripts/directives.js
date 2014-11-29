'use strict';

/* Directives */
//angular.module('myApp', ['myApp.directives']);

angular.module('myApp.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });

/* Directives */
//angular.module('myApp.directives', [])
//    .directive('pwCheck', [function () {
//      return {
//        require: 'ngModel',
//        link: function (scope, elem, attrs, ctrl) {
//
//          var me = attrs.pscheck;
//          var matchTo = attrs.pwCheck;
//
//          scope.$watch('[me, matchTo]', function(value){
//            ctrl.$setValidity('pwmatch', scope[me] === scope[matchTo] );
//          });
//
//        }
//      }
//    }]);