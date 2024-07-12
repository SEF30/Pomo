var t = TrelloPowerUp.iframe();

var timeLeft = 600; // 10 minutes
var timerInterval;
var audio = new Audio('https://yourdomain.com/tick-tock-sound.mp3'); // Remplacez par votre propre URL de fichier audio hébergé

var listId = null; 
var cards = [];
var currentCardIndex = 0;

function fetchColumns() {
    return t.lists('all').then(function(lists) {
        var select = document.getElementById('column-select');
        lists.forEach(function(list) {
            var option = document.createElement('option');
            option.value = list.id;
            option.text = list.name;
            select.add(option);
        });
    });
}

function fetchCards() {
    return t.lists('all').then(function(lists) {
        var list = lists.find(function(l) {
            return l.id === listId;
        });
        document.getElementById('list-name').innerText = list.name;
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
        document.getElementById('card-title').innerText = card.name;
        document.getElementById('card-desc').innerText = card.desc;
        document.getElementById('done-btn').style.display = 'block';
        document.getElementById('skip-btn').style.display = 'block';
        document.getElementById('timer').textContent = '10:00';
        timeLeft = 600;
        document.getElementById('focus-content').style.display = 'block';
    } else {
        alert('No more cards in the list.');
        t.closePopup();
    }
}

function startTimer() {
    document.getElementById('start-btn').style.display = 'none';
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

document.getElementById('start-btn').addEventListener('click', function() {
    listId = document.getElementById('column-select').value;
    fetchCards();
    startTimer();
});
document.getElementById('done-btn').addEventListener('click', completeTask);
document.getElementById('skip-btn').addEventListener('click', skipTask);

t.render(function() {
    fetchColumns();
});
