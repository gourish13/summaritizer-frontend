angular.module('missing', ['appFooter']);

angular.module('missing').component('missing', {
	template: `
		<notfound></notfound>
		<app-footer></app-footer>`
});

angular.module('missing').component('notfound', {
	templateUrl: './app/templates/missing.template.html',
	controller: ['particleJS', function(particleJS) {
		particleJS.startParticleMotion();
	}]
});
