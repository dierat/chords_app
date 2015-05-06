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
          chord1: chord[0],
          chord2: chord[1]
        });
      });
    }
  });
}

