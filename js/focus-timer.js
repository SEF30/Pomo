var t = TrelloPowerUp.iframe();

var timeLeft = 300; // 5 minutes
var timerInterval;

function startTimer() {
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('complete-btn').style.display = 'block';
  
  timerInterval = setInterval(function() {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Time is up!');
    }
  }, 1000);
}

function updateTimerDisplay() {
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft % 60;
  document.getElementById('timer').textContent = 
    (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function completeTask() {
  clearInterval(timerInterval);
  var timeSpent = 300 - timeLeft;
  
  t.get('card', 'shared', 'completedTasks', [])
  .then(function(completedTasks) {
    completedTasks.push({
      date: new Date().toISOString(),
      timeSpent: timeSpent
    });
    return t.set('card', 'shared', 'completedTasks', completedTasks);
  })
  .then(function() {
    t.closePopup();
  });
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('complete-btn').addEventListener('click', completeTask);

t.render(function() {
  // Nothing to do on render
});
