Template.header.helpers({
  counter: function() {
    return References.find().count();
  }
});