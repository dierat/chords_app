Chords = new Mongo.Collection('chords');

// sorting by user_id is disabled until users have been added
if (Meteor.isClient) {
  Template.registerHelper('formatDate', function(date) {
    return moment(date).fromNow();
  });

  Template.chords_list.helpers({
    chords: function() {
      var current_chords = Chords.find({/* user_id: Meteor.userId() */}, {sort: {created_at: -1}});
      if (!current_chords){return "None yet! Add a new chord pair above to get started."}
      else {return current_chords;}
    }
  });

  Template.chords_list.events({
    "click .new-chord-link": function(event, template){
      $(".chords-dropdown-menu").slideToggle();
    }
  });

  Template.new_chords.events({
    "click .submit-new-chord": function(event, template){
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
          chord1Letter: chord1Letter, 
          chord1Type: chord1Type,
          chord2Letter: chord2Letter, 
          chord2Type: chord2Type,
          created_at: new Date(),
          last_practice: null,
          total_practice: 0,
          best_num: null,
          average_num: null,
          practiceHistory: {}
        });
      }
    }
  });

  Template.chord.events({
    "click .show-details-link": function(event, template){
      $(event.target).siblings(".more-chord-details").slideToggle();
    },
    "click .add-practice-link": function(event, template){
      $(event.target).siblings(".add-new-practice").slideToggle();
    },
    "submit .num-changes": function(event){
      Meteor.setTimeout(function(){
        var num_changes = event.target.text.value;
        if (num_changes.length > 0 && typeof num_changes === 'number'){
          Chords.update(this._id, {$inc: {total_practice: 1}, $set: {last_practice: new Date()} });
        }
        // if num_changes > best_num, override best_num value
        // calculate new average_num and override that value
        // event.target.text.value === '';
      }.bind(this), 2000);
      return false;
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
          created_at: new Date(),
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

