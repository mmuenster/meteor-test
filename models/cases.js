//cases.js
Cases = new Mongo.Collection("cases")


Cases.attachSchema( new SimpleSchema({
	caseNumber: {
		type: String,
		defaultValue: "SP16-777777",
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

	caseType: {
		type:String,
		allowedValues: [
			"Prostate2",
			"Prostate6",
			"Prostate12",
			"Prostate18",
			"Prostate24",
			"Skin",
			"GI",
			"GYN",
			"Breast",
			"Urovysion",
			"Urine Cytology",
			],
		defaultValue: "Prostate12"
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
		optional: true,
		autoform: {
			omit: true
		}
	},

	copiaOrderId: {
		type: String,
		optional: true,
		autoform: {
			omit: true
		}

	},

	clinicalInformation: {
		type: String,
		optional: true
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
		type: String,
		optional: true
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
		optional: true,
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
		}
	},
	'patient.clientMRN': {
		type: String,
		optional: true
	},
	client: {
		type: Object
	},
	'client.officeName': {
		type: String
	},
	'client.providerName': {
		type: String
	},
	'client.location': {
		type: String
	},
	'client.specialInstructions': {
		type: String,
		optional: true
	},
	jars: {
		type: Array
	},
	'jars.$': {
		type: Object
	},
	'jars.$.id': {
		type: String,
		max: 2
	},
	'jars.$.clinicalInformation': {
		type: String,
		optional: true
	},
	'jars.$.siteLabel': {
		type: String
	},
	'jars.$.siteMapping': {
		type: String,
		optional: true
	},
	'jars.$.siteDistance': {
		type: String,
		optional: true
	},
	'jars.$.procedureLabel': {
		type: String,
		optional: true
	},
	'jars.$.dxText': {
		type: String,
		optional: true
	},
	'jars.$.dxCategory': {
		type: String,
		optional: true
	}, 
	'jars.$.dxTumorLength': {
		type: Number,
		optional: true
	},
	'jars.$.grossText': {
		type: String,
		optional: true
	},
	'jars.$.grossLength': {
		type: String,
		optional: true
	},
	'jars.$.grossInkColor': {
		type: String,
		optional: true
	},
	'jars.$.pieces': {
		type: String,
		optional: true
	},
	'jars.$.size': {
		type: String,
		optional: true
	},
	'jars.$.photos': {
		type: Array,
		optional: true
	},
	'jars.$.photos.$': {
		type: Object,
		optional: true
	},
	'jars.$.photos.$.id': {
		type: String,
		optional: true
	},
	'jars.$.photos.$.image': {
		type: String,
		optional: true
	},
	'jars.$.photos.$.caption': {
		type: String,
		optional: true
	},
	'jars.$.photos.$.priority': {
		type: String,
		optional: true
	},
	'jars.transportMedia': {
		type: String,
		optional: true
	},
	'jars.transportContainer': {
		type: String,
		optional: true
	},
	reports: {
		type: Array,
		optional: true,
		autoform: {
			omit: true
		}
	},
	'reports.$': {
		type: Object,
		optional: true
	},
	'reports.$.date': {
		type: Date,
		optional: true
	},
	'reports.$.type': {
		type: String,
		optional: true
	},
	'reports.$.pdf': {
		type: String,
		optional: true
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

