Template.referencePage.created = function() {
  Session.set('referencePageErrors', {});
}

Template.referencePage.rendered = function() {
  $('#thm').autosize();

  var thm = $('#thm').val();
  Session.set('content', thm);

  var title = $('#title').val();
  Session.set('title', title);

}

Template.referencePage.helpers({
  errorMessage: function(field) {
    return Session.get('referencePageErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('referencePageErrors')[field] ? 'has-error' : '';
  },
  savedContent: function() {
    return Session.get('content');
  },
  titleOfPage: function() {
    return Session.get('title');
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