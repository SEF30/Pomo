var t = TrelloPowerUp.iframe();
var timerInterval;
var audio = new Audio('https://example.com/tick-tock-sound.mp3'); // Replace with your own sound URL

function startTimer(duration) {
  var timeLeft = duration * 60;
  timerInterval = setInterval(function() {
    timeLeft--;
    updateTimerDisplay(timeLeft);
    audio.play();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Focus session ended!');
    }
  }, 1000);
}

function updateTimerDisplay(seconds) {
  var minutes = Math.floor(seconds / 60);
  var secs = seconds % 60;
  document.getElementById('timer').textContent = 
    (minutes < 10 ? '0' : '') + minutes + ':' + (secs < 10 ? '0' : '') + secs;
}

document.getElementById('next-card').addEventListener('click', function() {
  t.card('id', 'idList')
    .then(function(card) {
      return t.list('id', 'name', 'pos')
        .then(function(list) {
          var nextListId = t.lists().filter(function(l) {
            return l.pos > list.pos;
          })[0].id;
          return t.moveCard(card.id, nextListId);
        });
    });
});

document.getElementById('done-card').addEventListener('click', function() {
  clearInterval(timerInterval);
  t.set('card', 'shared', 'focusEndTime', Date.now())
    .then(function() {
      t.closePopup();
    });
});

t.render(function() {
  t.get('card', 'shared', 'focusDuration')
    .then(function(duration) {
      startTimer(duration || 25);
    });
});
