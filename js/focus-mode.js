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

t.render(function() {
    fetchCards();
});
