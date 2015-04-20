  Meteor.publish('allCases', function(filter) {
    if(this.userId) {
    	return Cases.find();
    } else {
    	return [];
    }
  })


