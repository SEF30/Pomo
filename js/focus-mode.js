var t = TrelloPowerUp.iframe();

var listId = new URLSearchParams(window.location.search).get('listId');
var cards = [];
var currentCardIndex = 0;

function fetchCards() {
    return t.lists('all').then(function(lists) {
        var list = lists.find(l => l.id === listId);
        return t.cards('all').then(function(allCards) {
            cards = allCards.filter(card => card.idList === listId);
            if (cards.length > 0) {
                loadCard(cards[0]);
            } else {
                alert('No cards in this column.');
                t.closePopup();
            }
        });
    });
}

function loadCard(card) {
    var cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = `<iframe src="https://trello.com/c/${card.id}" style="width: 100%; height: 80vh;"></iframe>`;
    startTimer();
}

function nextCard() {
    currentCardIndex++;
    if (currentCardIndex < cards.length) {
        loadCard(cards[currentCardIndex]);
    } else {
        alert('No more cards.');
        t.closePopup();
    }
}

document.getElementById('done-btn').addEventListener('click', function() {
    logTask('done', cards[currentCardIndex].id);
    nextCard();
});

document.getElementById('skip-btn').addEventListener('click', function() {
    logTask('skipped', cards[currentCardIndex].id);
    nextCard();
});

function logTask(action, cardId) {
    t.get('board', 'shared', 'completedTasks', []).then(function(completedTasks) {
        var newTask = {
            cardId: cardId,
            action: action,
            date: new Date().toISOString(),
            focusTime: 10 // assuming a task duration for logging
        };
        completedTasks.push(newTask);
        t.set('board', 'shared', 'completedTasks', completedTasks);
    });
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 600; // Reset timer to 10 minutes
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

t.render(function() {
    fetchCards();
});
