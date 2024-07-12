console.log('Power-Up is loading');

var GRAY_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-gray.svg';

window.TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: GRAY_ICON,
      text: 'Focus Mode',
      callback: function(t) {
        return t.popup({
          title: "Focus Mode",
          url: './focus.html',
          height: 300
        });
      }
    }];
  }
});
