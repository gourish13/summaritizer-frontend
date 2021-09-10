angular.module("updater", [
    'ngRoute',
	'navbar',
	'loader',
	'appFooter'
]);

angular.module("updater").component("update", {
    template: `
		<navbar></navbar>
		<update-form></update-form>
		<app-footer></app-footer>`
});

angular.module("updater").component("updateForm", {
    templateUrl: './app/templates/form.template.html',
    controller: [
		'$rootScope',
		'$element',
		'$location',
		'$http',
		'$routeParams',
		'$httpParamSerializerJQLike',
		'simpleMdE', 
		function($rootScope, $element, $location, $http,
				$routeParams, $httpParamSerializerJQLike, simpleMdE) {

			this.loading = true;
			simpleMdE.initEditor($element.find('textarea')[0]);
			this.author = "";
			this.content = "";
			this.update = true;
			this.msg = "";
			this.key = "";

			let self = this;

			$http.get(`/read/${$routeParams.id}`)
					.then(function(response) {
						self.author = response.data.author;
						self.content = response.data.content;
						simpleMdE.setValue(response.data.content);
						self.loading = false;
					})
					.catch(function(error) {
						console.log(error);
						self.loading = false;
					});

			this.anyFieldEmpty = function() {
				return (
					this.author === "" ||
					this.key === ""
				);
			}

			this.validEmail = function(valid) {
				if (this.email === "") return "input is-primary";
				if (valid) return "input is-success";
				else return "input is-danger";
			}

			this.updateContent = function() {
				if (this.anyFieldEmpty()) return;
				if (simpleMdE.getValue().length === 0) {
					this.msg = "No content to save";
					return;
				}
				if (simpleMdE.getValue() === this.content) {
					this.msg = "No new content to update";
					return;
				}
				this.msg = "";
				this.key = "";
				$location.path('/update/1');
			}

			this.deleteContent = function() {
				if (this.key === "") return;
				$location.path('/');
			}
		}
	],
});
