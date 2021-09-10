angular.module('loader', [])
.component('loader', {
	template: `<div 
				class="loader-wrapper" 
				ng-show="$ctrl.loading">
					<div class="loader is-loading" 
					 ng-style="$ctrl.loaderStyle"></div>
			   </div>`,
	bindings: {
		loading: '<',
		loaderStyle: '<'
	},
	controller: function() {
		let ctrl = this;
		ctrl.$onInit = function() {
			ctrl.loaderStyle = {
				height: "10rem",
				width: "10rem",
				border: "30px double #11ddaa",
				"border-right-color": "transparent",
				"border-left-color": "transparent",
				animation: "spinAround .8s infinite linear"
			};
		}
	}
})
