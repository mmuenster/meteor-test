Meteor.methods({
	insertNewMessage: function(doc) {
		Schema.messages.clean(doc)  //Takes care of adding the default and autovalues.
		check(doc, Schema.messages)  //Server side validation if user bypasses interface.
		Messages.insert(doc)
	},

	insertNewCase: function(doc) {
		Schema.cases.clean(doc);
		check(doc, Schema.cases);
		Cases.insert(doc);
	}
});

