angular.module('viewer', [
	'ngRoute',
	'ngSanitize',
	'navbar',
	'appFooter',
	'loader'
]);

angular.module('viewer').component('viewer', {
	template: `
		<navbar></navbar>
		<content-viewer></content-viewer>
		<app-footer></app-footer>`
});

angular.module('viewer').component('contentViewer', {
	templateUrl: './app/templates/viewer.template.html',
	// template: '<loader loading="$ctrl.loading"></loader><div ng-bind-html="$ctrl.content"></div>',
	controller: [
		'$rootScope',
		'$routeParams',
		'$http',
		'compiler',
		function($rootScope, $routeParams, $http, compiler) {

			this.loading = true;
			this.author = $rootScope.author ? $rootScope.author : "";
			this.content = $rootScope.content ? $rootScope.content : "";
			this.content = compiler.compileContent(this.content);
			
			this.loading = false;
		}
	]
})
