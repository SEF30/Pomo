var t = TrelloPowerUp.iframe();

var timeLeft = 600; // 10 minutes
var timerInterval;
var cardsCompleted = 0;

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timer').textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endSession();
    }
  }, 1000);
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var secs = seconds % 60;
  return minutes + ':' + (secs < 10 ? '0' : '') + secs;
}

function endSession() {
  t.set('board', 'shared', 'focusLogs', {
    date: new Date().toISOString(),
    cardsCompleted: cardsCompleted,
    timeSpent: 600 - timeLeft
  }).then(function() {
    t.closeModal();
  });
}

document.getElementById('complete-card').addEventListener('click', function() {
  cardsCompleted++;
  document.getElementById('cards-completed').textContent = cardsCompleted;
  t.card('id', 'idList')
    .then(function(card) {
      return t.list('id', 'name', 'pos')
        .then(function(list) {
          var nextListId = t.lists().filter(function(l) {
            return l.pos > list.pos;
          })[0].id;
          return t.cards('id', 'idList')
            .then(function(cards) {
              var currentListCards = cards.filter(function(c) {
                return c.idList === list.id;
              });
              var cardIndex = currentListCards.findIndex(function(c) {
                return c.id === card.id;
              });
              if (cardIndex < currentListCards.length - 1) {
                return t.moveCard(currentListCards[cardIndex + 1].id, list.id);
              } else {
                return t.moveCard(card.id, nextListId);
              }
            });
        });
    });
});

t.render(function(){
  startTimer();
});
