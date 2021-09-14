angular.module("Summaritizer", [
    'ngRoute',
    'creater',
    'updater',
	'viewer',
	'missing'
]);


angular.module("Summaritizer").config(['$routeProvider', function($routeProvider) {
    $routeProvider
	.when('/', {
	    template: '<home></home>',
	    title: "Home"
	})
	.when('/missing', {
		template: '<missing></missing>',
		title: 'Not Found'
	})
	.when('/view/:id', {
	    template: '<viewer></viewer>',
	    title: "View"
	})
    .when('/update/:id', {
	    template: '<update></update>',
	    title: "Update"
	})
	.otherwise('/');
}]);


angular.module("Summaritizer").config(['$locationProvider', function($locationProvider) {
    // $locationProvider.html5Mode(true);
    $locationProvider.html5Mode(false);
}]);

angular.module("Summaritizer").run(['$rootScope', '$route', function($rootScope, $route) {
		$rootScope.$on("$routeChangeSuccess", function(currentRoute, previousRoute) {
		$rootScope.title = $route.current.title;
    });
}]);
