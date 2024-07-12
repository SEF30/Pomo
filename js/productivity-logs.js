var t = TrelloPowerUp.iframe();

t.render(function() {
  return t.cards('id', 'name', 'shared')
  .then(function(cards) {
    var allTasks = [];
    cards.forEach(function(card) {
      if (card.shared && card.shared.completedTasks) {
        card.shared.completedTasks.forEach(function(task) {
          allTasks.push({
            cardName: card.name,
            date: new Date(task.date),
            timeSpent: task.timeSpent
          });
        });
      }
    });
    
    allTasks.sort(function(a, b) {
      return b.date - a.date;
    });
    
    var logsHtml = '<ul>';
    allTasks.forEach(function(task) {
      logsHtml += '<li>';
      logsHtml += task.cardName + ' - ';
      logsHtml += task.date.toLocaleString() + ' - ';
      logsHtml += Math.floor(task.timeSpent / 60) + ' minutes ' + (task.timeSpent % 60) + ' seconds';
      logsHtml += '</li>';
    });
    logsHtml += '</ul>';
    
    document.getElementById('logs').innerHTML = logsHtml;
  });
});
