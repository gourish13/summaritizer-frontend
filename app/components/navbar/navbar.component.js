angular.module('navbar', ['ngRoute'])
.component("navbar", {
    templateUrl: "./app/templates/navbar.template.html",
    controller: [
		'$location',
		'$document',
		'$routeParams',
		function($location, $document, $routeParams) {
			this.goToRoute = function(nextRoute) {
				if ($location.path().includes(nextRoute)) return;
				$location.path(nextRoute + '/' + $routeParams.id);	
			}
			this.toggleNavMenu = function() {
				angular.element($document[0].querySelectorAll('.navbar-menu')[0]).toggleClass('is-active');
				angular.element($document[0].querySelectorAll('.navbar-burger')[0]).toggleClass('is-active');	    
			}
    	}
	],
});
