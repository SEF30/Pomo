var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Focus Timer',
      callback: function(t) {
        return t.popup({
          title: "Focus Timer",
          url: './focus-timer.html',
          height: 300
        });
      }
    }];
  },
  'board-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Productivity Logs',
      callback: function(t) {
        return t.modal({
          title: 'Productivity Logs',
          url: './productivity-logs.html',
          height: 500
        });
      }
    }];
  }
});
