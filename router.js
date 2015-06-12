
Router.configure({
  layoutTemplate: 'layout'
});


Router.route('/', function() {
  this.render('chords_list');
});
