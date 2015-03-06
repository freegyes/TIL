References = new Mongo.Collection('references');

References.allow({
  update: function() { return true; },
  remove: function() { return true; }
});

References.deny({
  update: function(userId, reference, fieldNames) {
    // may only edit the following fields (if tries to edit else, length become > 0)
    return (_.without(fieldNames, 'title', 'thm', 'url').length > 0);
  }
});

References.deny({
  update: function(userId, reference, fieldNames, modifier) {
    var errors = validateReference(modifier.$set);
    return errors.title || errors.thm;
  }
});

 validateReference = function (reference) {
   var errors = {};

   if (!reference.title)
     errors.title = "Please fill in a headline";
   
   if (!reference.thm)
     errors.thm =  "Please share your thoughts";

   return errors;
 }

Meteor.methods({
  referenceInsert: function(referenceAttributes) {
     check(this.userId, String);
     check(referenceAttributes, {
       title: String,
       thm: String,
       url: String
     });
    
    var errors = validateReference(referenceAttributes);
    if (errors.title || errors.thm)
      throw new Meteor.Error('invalid-reference', "You must set a title and the lesson learnt for your reference");
    
    var user = Meteor.user();
    var reference = _.extend(referenceAttributes, {
      userId: user._id, 
      author: user.username, 
      submitted: new Date()
    });
    
    var referenceId = References.insert(reference);
    
    return {
      _id: referenceId
    };
  }
});