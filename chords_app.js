Chords = new Mongo.Collection('chords');

// sorting by user_id is disabled until users have been added
if (Meteor.isClient) {
  Template.chords_list.helpers({
    chords: function() {
      return Chords.find({/* user_id: Meteor.userId() */}, {sort: {best_num: -1}});
    }
  });
  Template.chords_list.events({
    "click #new-chord-link": function(event, template){
      $("#chords-dropdown-menu").slideToggle();
    },
    "click #submit-new-chord": function(event, template){
      var a = document.getElementById("letter1");
      var aChoice = a.options[a.selectedIndex].value;
      console.log("aChoice = ", aChoice);
      var b = document.getElementById("type1");
      var bChoice = b.options[b.selectedIndex].value;
      console.log("bChoice = ", bChoice);
      var c = document.getElementById("letter2");
      var cChoice = c.options[c.selectedIndex].value;
      console.log("cChoice = ", cChoice);
      var d = document.getElementById("type2");
      var dChoice = d.options[d.selectedIndex].value;
      console.log("dChoice = ", dChoice);
      // first check that the two pairs are not exactly the same
      // then check if that chord pair is already listed in the collection (first look to see if chord1 exists in the collection as chord1, and if it does, is the corresponding chord2 also the same as the one being selected now. then reverse the process and check if chord2 exists in the collection as chord1 and, if it does, if its corresponding chord2 is the same as chord1 being submitted. unless there is a way to do both at once?)
      // if neither of those checks return true, submit this chord pair into the collection using the pattern shown in Meteor.startup
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Chords.find().count() === 0) {
      var chords_array = [['C', 'G'], ['B#', 'G'], ['Am', 'E']];
      _.each(chords_array, function(chord) {
        Chords.insert({
          user_id: null,
          chord1: chord[0],
          chord2: chord[1],
          created: new Date(),
          last_practice: null,
          total_practice: 0,
          best_num: null,
          average_num: null,
          practice: {}
        });
      });
    }
  });
}

