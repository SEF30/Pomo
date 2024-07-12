var t = TrelloPowerUp.iframe();

var timeLeft = 600; // 10 minutes
var timerInterval;
var audio = new Audio('https://yourdomain.com/tick-tock-sound.mp3'); // Remplacez par votre propre URL de fichier audio hébergé

var listId = t.arg('listId'); // Récupère l'ID de la liste
var cards = [];
var currentCardIndex = 0;

function fetchCards() {
    return t.lists('all').then(function(lists) {
        var list = lists.find(function(l) {
            return l.id === listId;
        });
        return t.cards('all').then(function(allCards) {
            cards = allCards.filter(function(card) {
                return card.idList === list.id;
            }).sort(function(a, b) {
                return new Date(a.due) - new Date(b.due);
            });
            displayCard();
        });
    });
}

function displayCard() {
    if (cards.length > 0 && currentCardIndex < cards.length) {
        var card = cards[currentCardIndex];
        t.set('card', 'shared', 'currentCardId', card.id);
        document.getElementById('start-btn').style.display = 'block';
        document.getElementById('done-btn').style.display = 'none';
        document.getElementById('skip-btn').style.display = 'none';
        document.getElementById('timer').textContent = '10:00';
        timeLeft = 600;
    } else {
        alert('No more cards in the list.');
        t.closePopup();
    }
}

function startTimer() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('done-btn').style.display = 'block';
    document.getElementById('skip-btn').style.display = 'block';
    
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        audio.play();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Focus time is up! Great job!');
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
    var focusTime = Math.round((600 - timeLeft) / 60);
    
    t.get('card', 'shared', 'focusTime', 0).then(function(currentFocusTime) {
        return t.set('card', 'shared', 'focusTime', currentFocusTime + focusTime);
    }).then(function() {
        logTask('done');
        currentCardIndex++;
        displayCard();
    });
}

function skipTask() {
    clearInterval(timerInterval);
    logTask('skipped');
    currentCardIndex++;
    displayCard();
}

function logTask(action) {
    var cardId = cards[currentCardIndex].id;
    t.get('board', 'shared', 'completedTasks', []).then(function(completedTasks) {
        completedTasks.push({
            cardId: cardId,
            action: action,
            date: new Date().toISOString(),
            focusTime: Math.round((600 - timeLeft) / 60)
        });
        return t.set('board', 'shared', 'completedTasks', completedTasks);
    });
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('done-btn').addEventListener('click', completeTask);
document.getElementById('skip-btn').addEventListener('click', skipTask);

t.render(function() {
    fetchCards();
});
