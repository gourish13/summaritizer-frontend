angular.module('missing')
.service('particleJS', function() {
	this.startParticleMotion = function() {
		particlesJS.load("particles-js", './statics/particles.conf.json', function() {
			console.log('Particle.js config loaded on Missing Page');
		});
	}
});
