//messages.js
Messages = new Mongo.Collection("messages")

Schema.messages = new SimpleSchema({
	text: {
		type: String, 
		label: "Message",
		max: 144,
	},

	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function() { return new Date }
	}
})

Messages.attachSchema(Schema.messages)

if(Meteor.isServer) {
	Meteor.publish(null, function(filter) {
	    if(this.userId) {
	      return Messages.find();
	    } else {
	      return [];
	    }
	  })
}