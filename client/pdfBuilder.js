var averoLogoImg = "";
convertImgToBase64("http://localhost:3000/images/AveroLogo.png", function(base64Img) {
	averoLogoImg = base64Img;
});


function convertImgToBase64(url, callback, outputFormat){
	var canvas = document.createElement('CANVAS');
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.crossOrigin = 'Anonymous';
	img.onload = function(){
		canvas.height = img.height;
		canvas.width = img.width;
	  	ctx.drawImage(img,0,0);
	  	var dataURL = canvas.toDataURL(outputFormat || 'image/png');
	  	callback.call(this, dataURL);
        // Clean up
	  	canvas = null; 
	};
	img.src = url;
}

Template.pdfBuilder.rendered = function() {
	var ace = AceEditor.instance("editor",{
	    theme:"monokai", 
	    mode:"javascript"
	});
	ace.$blockScrolling = Infinity;
	//ace.setValue("This is some text"
}

Template.pdfBuilder.events({
	"click #test": function(event, template) {
		template.find("#previewPanel").src =  
				"/getPDF/" + template.find("#caseNumber").value + "/" + template.find("#reportName").value;
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
	},
});