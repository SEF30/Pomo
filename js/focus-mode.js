var t = TrelloPowerUp.iframe();

var currentCardIndex = 0;
var cards = [];

function fetchCards(listId) {
    t.cards('all').then(function(allCards) {
        cards = allCards.filter(card => card.idList === listId);
        if (cards.length > 0) {
            loadCard(cards[0]);
        }
    });
}

function loadCard(card) {
    var iframe = document.getElementById('trello-card-frame');
    iframe.src = 'https://trello.com/c/' + card.id;
}

function nextCard() {
    currentCardIndex++;
    if (currentCardIndex < cards.length) {
        loadCard(cards[currentCardIndex]);
    } else {
        alert('No more cards.');
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

t.render(function() {
    var listId = t.arg('listId');
    fetchCards(listId);
});
