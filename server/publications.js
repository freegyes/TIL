Meteor.publish('references', function() {
  return References.find({owner: this.userId});
})