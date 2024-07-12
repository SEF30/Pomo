var t = TrelloPowerUp.iframe();

t.render(function() {
  return t.list('name', 'id')
  .then(function(list) {
    return t.cards('id', 'name', 'shared', list.id)
    .then(function(cards) {
      var totalValue = 0;
      var highestValue = 0;
      var closestToClose = null;

      cards.forEach(function(card) {
        var value = parseFloat(card.shared.dealValue) || 0;
        totalValue += value;
        if (value > highestValue) highestValue = value;

        var closeDate = new Date(card.shared.expectedCloseDate);
        if (closeDate && (!closestToClose || closeDate < new Date(closestToClose.shared.expectedCloseDate))) {
          closestToClose = card;
        }
      });

      var statsHtml = '<h3>' + list.name + ' Analytics</h3>';
      statsHtml += '<p>Total Value: $' + totalValue.toFixed(2) + '</p>';
      statsHtml += '<p>Number of Deals: ' + cards.length + '</p>';
      statsHtml += '<p>Average Deal Value: $' + (totalValue / cards.length).toFixed(2) + '</p>';
      statsHtml += '<p>Highest Value Deal: $' + highestValue.toFixed(2) + '</p>';
      if (closestToClose) {
        statsHtml += '<p>Next Expected Close: ' + closestToClose.name + ' (' + closestToClose.shared.expectedCloseDate + ')</p>';
      }

      document.getElementById('listStats').innerHTML = statsHtml;
    });
  });
});
