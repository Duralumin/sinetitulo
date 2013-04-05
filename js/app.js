'use strict';


// Declare app level module which depends on filters, and services
//, ['SineTitulo.filters', 'SineTitulo.services', 'SineTitulo.directives']
angular.module('SineTitulo',[])
/*.
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }])*/

  .directive('tabs', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope, $element) {
                var panes = $scope.panes = [];

                $scope.select = function(pane) {
                    angular.forEach(panes, function(pane) {
                        pane.selected = false;
                    });
                    pane.selected = true;
                    pane.changePane({category: angular.fromJson(pane.item)})

                }

                this.addPane = function(pane) {
                    if (panes.length == 0) {
                        $scope.select(pane);
                    }

                    panes.push(pane);
                }
            },
            template: '<div class="tabbable">' + '<ul class="nav nav-tabs">' + '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' + '<a href="" ng-click="select(pane);">{{pane.title}}</a>' + '</li>' + '</ul>' + '<div class="tab-content" ng-transclude></div>' + '</div>',
            replace: true
        };
    })

    .directive('pane', function() {
        return {
            require: '^tabs',
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@title',
                item: '@item',
                changePane: '&'
            },
            link: function(scope, element, attrs, tabsCtrl) {
                tabsCtrl.addPane(scope);
            },
            template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' + '</div>',
            replace: true
        };
    })

    .directive('square', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope : {
                value : '=',
            },
            link: function(scope, elm, attrs, ctrl) {

                scope.valueToClass = function(value) {
                    var result = 'square-empty';
                        if (value == '1') {
                            result = 'square-temp';
                        } else if (value == '2') {
                            result = 'square-confirmed';
                        } else if (value == '3') {
                            result = 'square-critical';
                        }
                    return 'block-'+result;
                }

               // scope.blockClass = scope.valueToClass(scope.value);
                scope.$watch('value', function(newValue, oldValue) {
                    scope.blockClass = scope.valueToClass(newValue)

                }, true);

            },
            controller: function($scope, $element, $attrs) {
                $scope.changeValue = function() {
                    $scope.value = ($scope.value+1) % 4;
                    //$attrs.$set('class', 'block-' + $scope.valueToClass($scope.value));
                }
            },
            template : '<span class="{{blockClass}}"  ng-click="changeValue();">'+'</span>',
            replace: true
        };
    })

    ;


