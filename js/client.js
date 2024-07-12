var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

TrelloPowerUp.initialize({
  'list-actions': function(t) {
    return [{
      text: 'Start Focus Mode',
      callback: function(t) {
        return t.popup({
          title: "Select Focus Duration",
          url: './select-duration.html',
          height: 200
        });
      }
    }];
  },
  'board-buttons': function(t) {
    return [{
      icon: GRAY_ICON,
      text: 'Performance Logs',
      callback: function(t) {
        return t.modal({
          url: './performance-logs.html',
          height: 600,
          title: 'Performance Logs'
        });
      }
    }];
  }
});
