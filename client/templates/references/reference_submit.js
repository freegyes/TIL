Template.referenceSubmit.created = function() {
  Session.set('referenceSubmitErrors', {});
}

Template.referenceSubmit.rendered = function() {
  $('#thm').autosize();
}

Template.referenceSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('referenceSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('referenceSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.referenceSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var reference = {
      title: $(e.target).find('[name=title]').val(),
      thm: $(e.target).find('[name=thm]').val(),
      url: $(e.target).find('[name=url]').val()
    };
    
    var errors = validateReference(reference);
    if (errors.title || errors.thm)
      return Session.set('referenceSubmitErrors', errors);
    
    Meteor.call('referenceInsert', reference, function(error, result) {
       if (error)
         return throwError(error.reason, "danger");
       throwError("This new excellent thought was successfully added to your mind-palace.", "success");
       Router.go('home');  
    });
  },
  'click .cancel': function(e) {
    e.preventDefault();

    Router.go('home');
    throwError("Aye, captain, nothing was saved.", "warning");
  }
});