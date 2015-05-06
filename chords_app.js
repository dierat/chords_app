Chords = new Mongo.collection('chords');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Chords.find().count() === 0) {
      var chords = [['C', 'G'], ['B#', 'G'], ['Am', 'E']];
      _.each(chords, function(chord) {
        Chords.insert({
          chord1: chord[0],
          chord2: chord[1]
        });
      });
    }
  });
}
