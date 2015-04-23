


  Meteor.publish(null, function(filter) {
    if(this.userId) {
    	return Reports.find();
    } else {
    	return [];
    }
  })

