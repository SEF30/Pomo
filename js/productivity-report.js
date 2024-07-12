var t = TrelloPowerUp.iframe();

t.render(function() {
    t.get('board', 'shared', 'completedTasks', []).then(function(completedTasks) {
        var userProductivity = {};

        completedTasks.forEach(function(task) {
            if (!userProductivity[task.cardId]) {
                userProductivity[task.cardId] = { minutes: 0, actions: [] };
            }
            userProductivity[task.cardId].minutes += task.focusTime;
            userProductivity[task.cardId].actions.push(task.action);
        });

        var content = document.getElementById('content');
        content.innerHTML = '<h2>Productivity Report</h2>';
        Object.keys(userProductivity).forEach(function(cardId) {
            var data = userProductivity[cardId];
            content.innerHTML += `<div>Card ${cardId}: ${data.minutes} minutes, Actions: ${data.actions.join(', ')}</div>`;
        });
    });
});
