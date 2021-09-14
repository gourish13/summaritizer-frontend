angular.module("creater", [
    'contentForm',
    'appFooter'
]);

angular.module("creater").component("homeIntro", {
    templateUrl: './app/templates/intro.template.html',
    controller: ['particleJS', function(particleJS) {
        particleJS.startParticleMotion();
    }]
});

angular.module("creater").component("home", {
    template: `
        <home-intro></home-intro>
        <create-form></create-form>
        <app-footer></app-footer>`
})
