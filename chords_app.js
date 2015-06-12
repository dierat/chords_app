Chords = new Mongo.Collection('chords');

// sorting by user_id is disabled until users have been added
if (Meteor.isClient) {
  Template.chords_list.helpers({
    chords: function() {
      return Chords.find({/* user_id: Meteor.userId() */}, {sort: {created: -1}});
    }
  });
  Template.chords_list.events({
    "click #new-chord-link": function(event, template){
      $("#chords-dropdown-menu").slideToggle();
    },
    "click #submit-new-chord": function(event, template){
      var a = document.getElementById("letter1");
      var chord1Letter = a.options[a.selectedIndex].value;
      var b = document.getElementById("type1");
      var chord1Type = b.options[b.selectedIndex].value;
      var c = document.getElementById("letter2");
      var chord2Letter = c.options[c.selectedIndex].value;
      var d = document.getElementById("type2");
      var chord2Type = d.options[d.selectedIndex].value;
      if (chord1Letter === chord2Letter && chord1Type === chord2Type){
        console.log("The chords in your pair can not be identical.");
      // } else if (){
        // check if that chord pair is already listed in the collection (first look to see if chord1 exists in the collection as chord1, and if it does, is the corresponding chord2 also the same as the one being selected now. then reverse the process and check if chord2 exists in the collection as chord1 and, if it does, if its corresponding chord2 is the same as chord1 being submitted. unless there is a way to do both at once?)
      } else {
        Chords.insert({
          user_id: null,
          chord1: {letter: chord1Letter, type: chord1Type},
          chord2: {letter: chord2Letter, type: chord2Type},
          created: new Date(),
          last_practice: null,
          total_practice: 0,
          best_num: null,
          average_num: null,
          practiceHistory: {}
        });
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Chords.find().count() === 0) {
      var chords_array = [['C', 'Major', 'G', 'Major'], ['B#', 'Major', 'G', 'Major'], ['A', 'Minor', 'E', 'Minor']];
      _.each(chords_array, function(chord) {
        Chords.insert({
          user_id: null,
          chord1Letter: chord[0], 
          chord1Type: chord[1],
          chord2Letter: chord[2], 
          chord2Type: chord[3],
          created: new Date(),
          last_practice: null,
          total_practice: 0,
          best_num: null,
          average_num: null,
          practiceHistory: {}
        });
      });
    }
  });
}

