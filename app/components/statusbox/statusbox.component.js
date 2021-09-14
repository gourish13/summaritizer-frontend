angular.module('statusBox', []).component('statusBox', {
	template: `
			<article 
				class="message" 
				ng-class=" 'is-' + $ctrl.status.type " 
				ng-hide=" $ctrl.status.msg === '' "
				ng-click=" $ctrl.reset() ">
				<div
					class="message-body" 
					ng-bind="$ctrl.status.msg">
				</div>
			</article>`,
	controller: function() {
		this.reset = function() {
			this.status.type = '';
			this.status.msg = '';
		}
	},
	bindings: {
		status: '<'
	}
});
