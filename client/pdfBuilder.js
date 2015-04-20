Template.pdfBuilder.rendered = function() {
	var ace = AceEditor.instance("editor",{
	    theme:"monokai", 
	    mode:"javascript"
	});
	ace.$blockScrolling = Infinity;
	ace.setValue("This is some text")
}

Template.pdfBuilder.events({
	"click #test": function(event) {
		AceEditor.instance("editor", null, function(editor){
			Meteor.call("evaluateCode", editor.getValue(), 
				function (error, result) {
				  if (error) {
				    console.log(error)
				  } else {
				    console.log(result)
				  }
				}
			)
		});
	},

	"click #loadReport": function(event, template) {
		AceEditor.instance("editor", null, function(editor){
			ace.$blockScrolling = Infinity;
			editor.setValue(Reports.findOne({_id: template.find("#reportName").value}).code)
		})
	},

	"click #saveReport": function(event, template) {
		var x = Reports.findOne({_id: template.find("#reportName").value});
		AceEditor.instance("editor", null, function(editor){
			if(x) {
				var y = Reports.update({_id: template.find("#reportName").value},{code: editor.getValue()})
				console.log(y ? "Saved sucessfully" : "There was an error saving the report.")
			} else {
				var y = Reports.insert({_id: template.find("#reportName").value, code: editor.getValue()})
				console.log(y)
			}
		})
	}
});