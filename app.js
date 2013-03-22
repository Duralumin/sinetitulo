angular.module('STManager', [])


. directive('tabs', function() {
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
        }
 
        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }        
      },
      template:
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  })
  
  .directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@', category: '=' },
      link: function($scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane($scope);
        $scope.changeCategory = function(item) {
            alert("1");
            alert(item);
        }
    },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
 });
 
 /*
 .config(function($httpProvider) {
    $httpProvider.responseInterceptors.push('myHttpInterceptor');
    var spinnerFunction = function(data, headersGetter) {
		// todo start the spinner here
		$("body").spin({
			lines : 8,
			length : 4,
			width : 3,
			radius : 5,
			top : 0,
			left : 0
		});
		return data;
	};
	$httpProvider.defaults.transformRequest.push(spinnerFunction);
})
*/
 /*
// register the interceptor as a service, intercepts ALL angular ajax http calls
.factory('myHttpInterceptor', function($q, $window) {
	return function(promise) {
		return promise.then(function(response) {
			// do something on success
			// todo hide the spinner
			$("body").spin(false);
			return response;

		}, function(response) {
			// do something on error
			// todo hide the spinner
			$("body").spin(false);
			return $q.reject(response);
		});
	};
});*/