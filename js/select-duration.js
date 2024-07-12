var t = TrelloPowerUp.iframe();

document.getElementById('start-focus').addEventListener('click', function() {
  var duration = document.getElementById('duration').value;
  t.list('id', 'name')
    .then(function(list) {
      return t.post('/1/cards', {
        name: 'Focus Mode - ' + duration + ' minutes',
        idList: list.id,
        desc: 'Focus session for ' + duration + ' minutes.'
      });
    })
    .then(function(card) {
      return t.set('card', 'shared', 'focusDuration', duration)
        .then(function() {
          return t.set('card', 'shared', 'focusStartTime', Date.now());
        });
    })
    .then(function() {
      t.closePopup();
    });
});
