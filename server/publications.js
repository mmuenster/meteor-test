  Meteor.publish('allCases', function(filter) {
    if(this.userId) {
    	return Cases.find();
    } else {
    	return [];
    }
  })


  Meteor.publish(null, function(filter) {
    if(this.userId) {
    	return Reports.find();
    } else {
    	return [];
    }
  })