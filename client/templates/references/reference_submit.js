Template.referenceSubmit.created = function() {
  Session.set('referenceSubmitErrors', {});
  Session.set('content', '');
  Session.set('title', '')
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
  },
  savedContent: function() {
    return Session.get('content');
  },
  titleOfPage: function() {
    return Session.get('title');
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
  },
  'keyup #thm': function(e) {
    setTimeout(function(){
      e.preventDefault();
      var content = $(e.target).val();
      Session.set('content', '');
      Session.set('content', content);
    },100)
  },
  'keyup #title': function() {
    var title = $('#title').val();
    Session.set('title', title);
  },
  'click .callServer': function() {
    
    function addHttp(url) {
       if (!/^(f|ht)tps?:\/\//i.test(url)) {
          url = "http://" + url;
       }
       return url;
    }

    var url = addHttp($('#url').val());

    Meteor.call('scrapeTitle', url, function(error, result) {
      if (error) return throwError ("Are you sure this is a valid URL?", "warning");
      $('#title').val(result);
      Session.set('title', result);
    });
  }
});