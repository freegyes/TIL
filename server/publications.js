Meteor.publish('references', function() {
  return References.find();
})