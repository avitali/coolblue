'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices','templateServices','searchQuery','trackCart']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'partials/format.html',   controller: FormatListCtrl}).
	      when('/templates', {templateUrl: 'partials/templates.html',   controller: TemplListCtrl}).
      otherwise({redirectTo: '/'});
}]);
