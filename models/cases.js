//cases.js
Cases = new Mongo.Collection("cases")


Cases.attachSchema( new SimpleSchema({
	caseNumber: {
		type: String,
		autoform: {
			omit: true
		}
	},

	status: {
		type: String,
		optional: true,
		autoform: {
			omit: true
		}
	},

	collectionDate: {
		type: Date,
		autoform: {
			value: new Date(new Date().setDate(new Date().getDate()-1))  //code for yesterday
		} 
	},

	receivedDate: {
		type: Date,
		autoform: {
			value: new Date
		} 
	},

	signoutDate: {
		type: Date,
		optional: true,
		autoform: {
			omit: true
		}
	},

	amendments: {
		type: String,
		autoform: {
			omit: true
		}
	},

	copiaOrderId: {
		type: String,
		autoform: {
			omit: true
		}

	},

	clinicalInformation: {
		type: String
	},

	laboratory: {
		type: String,
		allowedValues: [
		"Dallas",
		"Lubbock"
		],
		defaultValue: "Dallas"
	},

	requisitionNumber: {
		type: String
	},

	patient: {
		type: Object
	},

	'patient.dob': {
		type: Date
	},

	'patient.firstName': {
		type: String
	},

	'patient.lastName': {
		type: String
	},

	'patient.middleName': {
		type: String
	},

	'patient.gender': {
		type: String,
		allowedValues: [
		"Male",
		"Female",
		]
	},
	'patient.copiaPatientId': {
		type: Number,
		autoform: {
			omit: true
		}
	},
	'patient.socialSecurityNumber': {
		type: String,
		max: 11,
		regEx:/^\d{3}-\d{2}-\d{4}$/,		
		autoform: {
			placeholder: "XXX-XX-XXXX",
			disabled: true
		}
	}

}))

if(Meteor.isServer) {
  Meteor.publish('allCases', function(filter) {
    if(this.userId) {
    	return Cases.find();
    } else {
    	return [];
    }
  })
}

