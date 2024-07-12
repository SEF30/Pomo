var GRAY_ICON = 'https://yourdomain.com/icon-gray.svg';  // Remplacez par votre propre URL d'icône hébergée

TrelloPowerUp.initialize({
    'board-buttons': function(t, options) {
        return [{
            icon: GRAY_ICON,
            text: 'Start Focus Mode',
            callback: function(t) {
                return t.popup({
                    title: "Focus Mode",
                    url: './focus-mode.html',
                    height: 300
                });
            }
        },
        {
            icon: GRAY_ICON,
            text: 'Productivity Report',
            callback: function(t) {
                return t.modal({
                    title: 'Productivity Report',
                    url: './productivity-report.html',
                    height: 500,
                    fullscreen: false
                });
            }
        }];
    },
    'card-badges': function(t, options) {
        return t.get('card', 'shared', 'focusTime').then(function(focusTime) {
            return [{
                icon: GRAY_ICON,
                text: focusTime ? focusTime + ' min focused' : 'Not started',
                color: focusTime ? 'green' : 'red'
            }];
        });
    }
});
