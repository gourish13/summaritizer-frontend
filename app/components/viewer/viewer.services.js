angular.module('viewer').service('compiler', function() {
	this.compileContent = function(content) {
		const compiledContent = marked(content);
		setTimeout(function() {
			hljs.highlightAll();
		}, 1000);
		return compiledContent;
	};
});
