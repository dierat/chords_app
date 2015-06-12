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

