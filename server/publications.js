Meteor.publish('references', function() {
  return References.find({userId: this.userId});
});