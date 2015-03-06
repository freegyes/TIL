Template.referenceSubmit.created = function() {
  Session.set('referenceSubmitErrors', {});
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
         return throwError(error.reason);
       Router.go('referencePage', {_id: result._id});  
    });
  }
});