Template.pdfBuilder.rendered = function() {
	var ace = AceEditor.instance("editor",{
	    theme:"monokai", 
	    mode:"javascript"
	});
}

Template.pdfBuilder.events({
	"click #test": function(event) {
		AceEditor.instance("editor", null, function(editor){
			console.log(editor.getValue());
		})
	}
})