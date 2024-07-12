console.log('Power-Up is loading');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize({
  'list-actions': function(t) {
    return [{
      text: 'Start Focus Session',
      callback: function(t) {
        return t.modal({
          url: './focus.html',
          height: 300,
          title: 'Focus Session'
        });
      }
    }];
  },
  'card-badges': function(t) {
    return t.card('all')
      .then(function(card) {
        if (card.idList === t.getContext().list) {
          return [{
            icon: GRAY_ICON,
            text: 'In Focus',
            color: 'green'
          }];
        }
      });
  },
  'board-buttons': function(t) {
    return [{
      icon: GRAY_ICON,
      text: 'Focus Logs',
      callback: function(t) {
        return t.modal({
          url: './logs.html',
          height: 500,
          title: 'Focus Session Logs'
        });
      }
    }];
  }
});
