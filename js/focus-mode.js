var t = TrelloPowerUp.iframe();

document.getElementById('save-settings').addEventListener('click', function(){
  var duration = document.getElementById('session-duration').value;
  t.set('board', 'shared', 'focusSessionDuration', duration)
  .then(function(){
    t.closePopup();
  });
});

t.render(function(){
  return t.get('board', 'shared', 'focusSessionDuration')
  .then(function(duration){
    if (duration) {
      document.getElementById('session-duration').value = duration;
    }
  });
});
