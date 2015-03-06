Template.referencePage.created = function() {
  Session.set('referencePageErrors', {});
}

Template.referencePage.helpers({
  errorMessage: function(field) {
    return Session.get('referencePageErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('referencePageErrors')[field] ? 'has-error' : '';
  }
});

Template.referencePage.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentReferenceId = this._id;
    
    var referenceProperties = {
      title: $(e.target).find('[name=title]').val(),
      thm: $(e.target).find('[name=thm]').val(),
      url: $(e.target).find('[name=url]').val()
    };

    References.update(currentReferenceId, {$set: referenceProperties}, function(error) {
      if (error) {
        throwError(error.reason + " (or perhaps the validation failed).", "danger");
      } else {
        Router.go('home');
        throwError("Seems more perfect than before.", "success");
      }
    });
  },
  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Sure you want to do this?")) {
      var currentReferenceId = this._id;
      References.remove(currentReferenceId);
      Router.go('home');
      throwError("This entry has been deprived of its eternal glory.", "warning");
    }
  }
});