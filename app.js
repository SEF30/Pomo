console.log('Power-Up is loading');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: GRAY_ICON,
      text: 'Focus Mode',
      callback: function(t){
        return t.modal({
          url: './index.html',
          height: 500,
          title: 'Focus Mode'
        });
      }
    }];
  },
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Focus on this',
      callback: function(t) {
        return t.modal({
          url: './index.html',
          height: 500,
          title: 'Focus Mode'
        });
      }
    }];
  }
});

var t = TrelloPowerUp.iframe();

let timeLeft = 600; // 10 minutes en secondes
let timerInterval;

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timer').textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert('Temps écoulé !');
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

document.getElementById('done-btn').addEventListener('click', function() {
  clearInterval(timerInterval);
  t.set('card', 'shared', 'focusData', { action: 'done', timeSpent: 600 - timeLeft })
    .then(function() {
      t.closeModal();
    });
});

document.getElementById('later-btn').addEventListener('click', function() {
  clearInterval(timerInterval);
  t.set('card', 'shared', 'focusData', { action: 'later', timeSpent: 600 - timeLeft })
    .then(function() {
      t.closeModal();
    });
});

t.render(function(){
  return t.card('all')
    .then(function(card) {
      document.getElementById('card-display').textContent = card.name;
      startTimer();
    });
});
