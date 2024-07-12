var GRAY_ICON = 'https://yourdomain.com/icon-gray.svg';  // Remplacez par votre propre URL d'icône hébergée

TrelloPowerUp.initialize({
    'list-buttons': function(t, options) {
        return t.lists('all').then(function(lists) {
            return lists.map(function(list) {
                return {
                    text: `Start Focus in ${list.name}`,
                    callback: function(t) {
                        return t.popup({
                            title: `Focus Mode in ${list.name}`,
                            url: './focus-mode.html',
                            args: { listId: list.id },
                            height: 300
                        });
                    }
                };
            });
        });
    },
    'board-buttons': function(t, options) {
        return [{
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
