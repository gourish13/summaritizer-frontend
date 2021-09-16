angular.module("updater", [
    'ngRoute',
	'navbar',
	'loader',
	'statusBox',
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
		'$window',
		'$http',
		'$routeParams',
		'$httpParamSerializerJQLike',
		'simpleMdE', 
		function($rootScope, $element, $location, $window, $http,
				$routeParams, $httpParamSerializerJQLike, simpleMdE) {

			this.loading = true;
			simpleMdE.initEditor($element.find('textarea')[0]);
			this.author = $rootScope.author ? $rootScope.author : "";
			this.content = $rootScope.content ? $rootScope.content : "";
			this.update = true;
			this.msg = "";
			this.key = "";
			this.status = { type: '', msg: '' };
			$rootScope.status = undefined;

			if (this.author === '' || this.content === '') {
				let self = this;
				$http.get(`/api/read/${$routeParams.id}`)
						.then(function(response) {
							self.author = response.data.author;
							$rootScope.author = response.data.author;
							self.content = response.data.content;
							$rootScope.content = response.data.content;
							simpleMdE.setValue(response.data.content);
							self.loading = false;
						})
						.catch(function(response) {
							console.log(response);
							if (response.status === 404)
								$location.path('/missing');
						});
			}
			else {
				simpleMdE.setValue(this.content);
				this.loading = false;
			}
				

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
				if (this.anyFieldEmpty())
					return;

				let content = simpleMdE.getValue();

				if (content.length === 0) {
					this.msg = "No content to save";
					return;
				}
				if (content === this.content) {
					this.msg = "No new content to update";
					return;
				}

				this.loading = true;
				let data = {};
				data.author = this.author;
				data.content = content;
				data.key = this.key;

				this.msg = "";
				this.key = "";
				let self = this;

				$http({
					method: 'POST',
					url: `/api/update/${$routeParams.id}`,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
					data: $httpParamSerializerJQLike(data)
				})
					.then(function(response) {
						if (response.status === 201) {
							$rootScope.content = self.content = content;
							$rootScope.author = self.author;
							self.status.type = 'success';
							self.status.msg = response.data;
						}
						self.loading = false;
						$window.scrollTo(0, 0);
					})
					.catch(function(response) {
						if (response.status === 403 || response.status === 406) {
							self.status.type = 'danger';
							self.status.msg = response.data;
						}
						self.loading = false;
						$window.scrollTo(0, 0);
					});
			}

			this.deleteContent = function() {
				if (this.key === "")
					return;

				this.loading = true;
				let data = {};
				data.key = this.key;
				this.key = '';
				let self = this;

				$http({
					method: 'POST',
					url: `/api/delete/${$routeParams.id}`,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
					data: $httpParamSerializerJQLike(data)
				})
					.then(function(response) {
						console.log(response)
						if (response.status === 200) {
							$rootScope.content = '';
							$rootScope.author = '';
							$rootScope.status = {};
							$rootScope.status.type = 'success';
							$rootScope.status.msg = response.data;
						}
						$location.path('/');
					})
					.catch(function(response) {
						if (response.status === 403 || response.status === 406) {
							self.status.type = 'danger';
							self.status.msg = response.data;
						}
						self.loading = false;
						$window.scrollTo(0, 0);
					});
			}
		}
	],
});
