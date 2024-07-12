var t = TrelloPowerUp.iframe();

var timeLeft = 1500; // 25 minutes
var timerInterval;

document.getElementById('start-btn').addEventListener('click', function() {
  this.style.display = 'none';
  document.getElementById('done-btn').style.display = 'block';
  startTimer();
});

document.getElementById('done-btn').addEventListener('click', function() {
  clearInterval(timerInterval);
  var focusedTime = Math.round((1500 - timeLeft) / 60);
  t.set('card', 'shared', 'focusTime', focusedTime)
    .then(function(){
      t.closePopup();
    });
});

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timer').textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Focus time is up!');
    }
  }, 1000);
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var secs = seconds % 60;
  return minutes + ':' + (secs < 10 ? '0' : '') + secs;
}

t.render(function(){
  // Nothing to do here
});
