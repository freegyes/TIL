Meteor.startup(function () {

  Meteor.methods({
    scrapeTitle: function(url) {
      check(url, String);

      var result = Meteor.http.get(url);

      var str = result.content;
      var title = str.substring(str.lastIndexOf("<title>")+7,str.lastIndexOf("<\/title>"));

      return title;

    }
  });
});