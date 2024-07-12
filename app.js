var t = TrelloPowerUp.iframe();

// Clé API Trello
const TRELLO_API_KEY = 'c31074f3d8e0e6f20463b1455798f962';

// Initialisation du Power-Up
window.TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: 'https://example.com/icon.png',
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
      icon: 'https://example.com/icon.png',
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

// Logique du timer et des boutons
let timeLeft = 600; // 10 minutes en secondes
let timerInterval;

function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    document.getElementById('timer').textContent = formatTime(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Logique quand le temps est écoulé
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

// Fonction pour obtenir un token (à utiliser avec précaution)
function getToken() {
  return t.getRestApi()
    .getToken()
    .then(function(token) {
      console.log('Token:', token);
    });
}