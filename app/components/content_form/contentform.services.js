angular.module('contentForm').service("simpleMdE", function() {
    var simplemde;
    this.initEditor =  function(element) {
		simplemde = new SimpleMDE({
			element: element,
			spellChecker: true,
			hideIcons: ["guide"],
			renderingConfig: {
				singleLineBreaks: false,
				codeSyntaxHighlighting: true,
			},
		});
	}
	this.getValue = function() {
		return simplemde.value();
    }
})
