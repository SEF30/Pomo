var t = TrelloPowerUp.iframe();

var timeLeft = 600; // 10 minutes
var timerInterval;
var currentCardIndex = 0;
var cards = [];

function updateCardDisplay(card) {
    var cardEl = document.getElementById('card-content');
    cardEl.innerHTML = `<strong>${card.name}</strong><p>${card.desc}</p>`;
    document.getElementById('timer').textContent = '10:00';
    timeLeft = 600; // reset timer
    document.getElementById('start-btn').style.display = 'block';
    document.getElementById('done-btn').style.display = 'none';
    document.getElementById('skip-btn').style.display = 'none';
}

function fetchCards(listId) {
    t.cards('visible').then(function(allCards) {
        cards = allCards.filter(card => card.idList === listId).sort((a, b) => new Date(a.due) - new Date(b.due));
        if (cards.length > 0) {
            updateCardDisplay(cards[currentCardIndex]);
        }
    });
}

function nextCard() {
    currentCardIndex++;
    if (currentCardIndex < cards.length) {
        updateCardDisplay(cards[currentCardIndex]);
    } else {
        alert('No more cards in this list.');
        t.closePopup();
    }
}

function startFocus() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('done-btn').style.display = 'block';
    document.getElementById('skip-btn').style.display = 'block';
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            nextCard();  // automatically move to the next card when time runs out
        }
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

document.getElementById('done-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    logTask('done', timeLeft);
    nextCard();
});

document.getElementById('skip-btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    logTask('skipped', timeLeft);
    nextCard();
});

function logTask(action, remainingTime) {
    var cardId = cards[currentCardIndex].id;
    var spentTime = 600 - remainingTime;  // calculate time spent on the card
    t.set('board', 'shared', 'completedTasks', []).then(completedTasks => {
        completedTasks.push({ cardId, action, date: new Date().toISOString(), focusTime: Math.round(spentTime / 60) });
        t.set('board', 'shared', 'completedTasks', completedTasks);
    });
}

t.render(() => {
    var listId = t.arg('listId');  // assuming listId is passed correctly from the popup
    fetchCards(listId);
});
