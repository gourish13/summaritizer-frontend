angular.module("contentForm", [
    "ngRoute",
]);

angular.module("contentForm").component("createForm", {
    templateUrl: './app/templates/form.template.html',
    controller: [
		'$rootScope',
		'$element',
		'$location',
		'$window',
		'$http',
		'$httpParamSerializerJQLike',
		'simpleMdE',
		function($rootScope, $element, $location, $window,
					$http, $httpParamSerializerJQLike, simpleMdE) {

			simpleMdE.initEditor($element.find('textarea')[0]);
			this.author = '';
			this.hours ='';
			this.minutes = '';
			this.email = '';
			this.update = false;
			this.msg = "";
			this.loading = false;
			if ($rootScope.status !== undefined) {
				this.status = $rootScope.status;
				$window.scrollTo(0, 0);
			}
			else
				this.status = { type: '', msg: '' };

			this.anyFieldEmpty = function() {
				return (
					this.author === "" ||
					this.hours === "" ||
					this.minutes === "" ||
					this.email === ""    
				);
			}

			this.timeInvalid = function() {
				return (
					this.hours === 0 && this.minutes === 0 ||
					this.hours === 24 && this.minutes !== 0 
				);
			}

			this.validateHrsMins = function() {
				if (this.hours === "" && this.minutes === "") return "input is-normal is-primary"
				return "input is-normal " + ((this.timeInvalid()) ? "is-danger" : "is-success");   
			}

			this.validEmail = function(valid) {
				if (this.email === "") return "input is-primary";
				if (valid) return "input is-success";
				else return "input is-danger";
			}
			
			this.saveContent = function() {
				if (simpleMdE.getValue().length === 0) {
					this.msg = "No content to save";
					return
				}
				this.msg = "";
				this.loading = true;

				let data = {};
				data.author = this.author;
				data.hours = this.hours;
				data.minutes = this.minutes;
				data.email = this.email;
				this.content = data.content = simpleMdE.getValue();

				let postReq = {
					method: 'POST',
					url: '/api/create',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
					data: $httpParamSerializerJQLike(data)
				};
				let self = this;

				$http(postReq)
					.then(function(response) {
						$rootScope.author = self.author;
						$rootScope.content = self.content;
						$location.path(`/view/${response.data.id}`);
					})
					.catch(function(response) {
						self.status.type = 'danger';
						self.status.msg = 'Couldn\'t connect to the server';
						$window.scrollTo(0, 0);
						self.loading = false;
					})
			}
    	}
	]
});
