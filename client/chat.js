Template.chat.helpers({
    messages: function() {
      return Messages.find();
    }
  })

  Template.chat.events({
    "submit #new-message": function (event) {
      var text = event.target.text.value;

      Messages.insert({
        text: text,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
});