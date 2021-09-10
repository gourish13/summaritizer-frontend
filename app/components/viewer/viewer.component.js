angular.module('viewer', [
	'navbar',
	'appFooter'
]);

angular.module('viewer').component('viewer', {
	template: `
		<navbar></navbar>
		<app-footer></app-footer>`
});

angular.module('viewer').component('contentViewer', {
	templateUrl: './app/templates/viewer.template.html',
})
