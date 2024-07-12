var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

TrelloPowerUp.initialize({
  'board-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Sales Pipeline',
      callback: function(t) {
        return t.modal({
          url: './sales-pipeline.html',
          height: 600,
          title: 'Sales Pipeline Overview'
        });
      }
    }];
  },
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Deal Details',
      callback: function(t) {
        return t.popup({
          title: "Deal Details",
          url: './deal-details.html',
          height: 300
        });
      }
    }];
  },
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'dealValue')
    .then(function(dealValue) {
      return [{
        icon: GRAY_ICON,
        text: dealValue ? '$' + dealValue : 'No value set',
        color: dealValue ? 'green' : 'red'
      }];
    });
  },
  'list-actions': function(t) {
    return [{
      text: 'List Analytics',
      callback: function(t) {
        return t.modal({
          url: './list-analytics.html',
          height: 500,
          title: 'List Analytics'
        });
      }
    }];
  }
});
