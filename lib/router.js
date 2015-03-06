Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { 
  return [Meteor.subscribe('references')]
  }
});

Router.route('/', { name: 'home'});

Router.route('/references/:_id', {
  name: 'referencePage',
  data: function() { return References.findOne(this.params._id); }
});

Router.route('/submit', {name: 'referenceSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'referencePage'});
Router.onBeforeAction(requireLogin, {only: 'referenceSubmit'});