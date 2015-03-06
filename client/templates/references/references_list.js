Template.referencesList.helpers({
  references: function() { 
    if (References.find().count() === 0) {
      
      var reference = {
      title: "This place just got better with you",
      thm: "This is a sample reference and will always show up if this list would be empty. Modify it to your liking or trash it after you started to log that you have learnt today. If you feel like contributing don't hesitate.",
      url: "https://github.com/freegyes/TIL"
      };
      
      Meteor.call('referenceInsert', reference, function(error, result) {
        if (error)
          return throwError(error.reason, "danger");
        throwError("Empty lists are boring, dummy reference added FTW.", "success");
      });
    };     
    return References.find({}, {sort: {submitted: -1}});
  }
});