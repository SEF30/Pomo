var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

TrelloPowerUp.initialize({
  'board-buttons': function(t, options){
    return [{
      icon: GRAY_ICON,
      text: 'Focus Mode',
      callback: function(t){
        return t.modal({
          url: './focus-mode.html',
          height: 600,
          title: 'Focus Mode'
        })
      }
    }, {
      icon: GRAY_ICON,
      text: 'Performance Logs',
      callback: function(t){
        return t.modal({
          url: './performance-logs.html',
          height: 600,
          title: 'Performance Logs'
        })
      }
    }];
  },
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'focusTime')
    .then(function(focusTime) {
      return [{
        icon: GRAY_ICON,
        text: focusTime ? focusTime + ' min' : 'Not focused',
        color: focusTime ? 'green' : 'red'
      }];
    });
  },
  'list-actions': function(t) {
    return [{
      text: 'Start Focus Session',
      callback: function(t) {
        return t.modal({
          url: './focus-session.html',
          height: 300,
          title: 'Focus Session'
        });
      }
    }];
  }
});
