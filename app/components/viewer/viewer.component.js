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
	controller: [
		'$rootScope',
		'$routeParams',
		'$http',
		'compiler',
		function($rootScope, $routeParams, $http, compiler) {

			this.loading = true;
			this.author = $rootScope.author ? $rootScope.author : "";
			this.content = $rootScope.content ? $rootScope.content : "";
			
			if (this.author === '' || this.content === '') {
				let self = this;
				$http.get(`/api/read/${$routeParams.id}`)
						.then(function(response) {
							self.author = response.data.author;
							$rootScope.author = response.data.author;
							self.content = response.data.content;
							$rootScope.content = response.data.content;
							self.content = compiler.compileContent(self.content);
							self.loading = false;
						})
					.catch(function(response) {
						console.log(response);
						if (response.status === 404)
							$location.path('/missing');
					});
			}
			else {
				this.content = compiler.compileContent(this.content);
				this.loading = false;
			}
		}
	]
})
