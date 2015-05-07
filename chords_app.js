Chords = new Mongo.Collection('chords');

if (Meteor.isClient) {
  Template.chords_list.helpers({
    chords: function() {
      return Chords.find();
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

