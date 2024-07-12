var t = TrelloPowerUp.iframe();

t.render(function(){
  return t.get('board', 'shared', 'performanceLogs', [])
  .then(function(logs){
    var logsHtml = '<ul>';
    logs.forEach(function(log){
      logsHtml += '<li>';
      logsHtml += 'Date: ' + new Date(log.date).toLocaleString() + ', ';
      logsHtml += 'Cards Completed: ' + log.cardsCompleted + ', ';
      logsHtml += 'Duration: ' + log.duration;
      logsHtml += '</li>';
    });
    logsHtml += '</ul>';
    document.getElementById('logs').innerHTML = logsHtml;
  });
});
