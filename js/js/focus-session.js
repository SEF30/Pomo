var t = TrelloPowerUp.iframe();

var timeLeft;
var timerInterval;
var cardsCompleted = 0;

function startTimer(duration) {
  timeLeft = duration * 60;
  updateTimerDisplay();
  timerInterval = setInterval(function() {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Focus session ended!');
      endSession();
    }
  }, 1000);
}

function updateTimerDisplay() {
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft % 60;
  document.getElementById('timer').textContent = 
    (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function completeCard() {
  cardsCompleted++;
  document.getElementById('cards-completed').textContent = cardsCompleted;
  t.list('id', 'name')
  .then(function(list){
    return t.lists('id', 'name')
    .then(function(lists){
      var currentListIndex = lists.findIndex(function(l){ return l.id === list.id; });
      if (currentListIndex < lists.length - 1) {
        var nextList = lists[currentListIndex + 1];
        return t.card('id')
        .then(function(card){
          return t.moveCard(card.id, nextList.id);
        });
      }
    });
  });
}

function endSession() {
  clearInterval(timerInterval);
  t.get('board', 'shared', 'performanceLogs', [])
  .then(function(logs){
    logs.push({
      date: new Date().toISOString(),
      cardsCompleted: cardsCompleted,
      duration: document.getElementById('timer').textContent
    });
    return t.set('board', 'shared', 'performanceLogs', logs);
  })
  .then(function(){
    t.closeModal();
  });
}

document.getElementById('complete-card').addEventListener('click', completeCard);
document.getElementById('end-session').addEventListener('click', endSession);

t.render(function(){
  return t.get('board', 'shared', 'focusSessionDuration')
  .then(function(duration){
    startTimer(duration || 25);
  });
});
