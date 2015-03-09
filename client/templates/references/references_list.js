Template.referencesList.helpers({
  references: function() { 
    if (References.find().count() === 0) {
      
      var reference = [{
            title: "This place just got better with you!",
            thm: "This is a *ghost reference* and **will automatically disappear** when you [start adding that you have learnt today](/submit). \n\n If you feel like contributing don't hesitate and [contact me](https://github.com/freegyes/TIL).",
            url: "https://github.com/freegyes/TIL"
            }];

      return reference;
      
    } else {    
      
      return References.find({}, {sort: {submitted: -1}});
    
    }
  }
});