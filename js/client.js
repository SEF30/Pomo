var GRAY_ICON = 'https://yourdomain.com/icon-gray.svg';  // Remplacez par votre propre URL d'icône hébergée

TrelloPowerUp.initialize({
    'board-buttons': function(t, options) {
        return [{
            icon: GRAY_ICON,
            text: 'Start Focus Mode',
            callback: function(t) {
                return t.popup({
                    title: "Select Column for Focus Mode",
                    url: './select-column.html',
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
    }
});
