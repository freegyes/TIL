Template.referencesList.helpers({
  references: function() {
    return References.find({}, {sort: {submitted: -1}});
  }
});