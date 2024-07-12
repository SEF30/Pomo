var t = TrelloPowerUp.iframe();

t.render(function(){
  t.get('board', 'shared', 'focusLogs')
    .then(function(logs) {
      if (logs) {
        var logsHtml = '<ul>';
        logsHtml += '<li>Date: ' + new Date(logs.date).toLocaleString() + '</li>';
        logsHtml += '<li>Cards Completed: ' + logs.cardsCompleted + '</li>';
        logsHtml += '<li>Time Spent: ' + formatTime(logs.timeSpent) + '</li>';
        logsHtml += '</ul>';
        document.getElementById('logs').innerHTML = logsHtml;
      } else {
        document.getElementById('logs').innerHTML = 'No logs available.';
      }
    });
});

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var secs = seconds % 60;
  return minutes + ' minutes ' + secs + ' seconds';
}
