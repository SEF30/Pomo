var t = TrelloPowerUp.iframe();

t.render(function() {
    t.get('board', 'shared', 'completedTasks', []).then(function(completedTasks) {
        var tasksByDay = {};
        var userProductivity = {};

        completedTasks.forEach(function(task) {
            var date = new Date(task.date).toLocaleDateString();
            tasksByDay[date] = (tasksByDay[date] || 0) + task.focusTime;
            
            userProductivity[task.cardId] = (userProductivity[task.cardId] || 0) + task.focusTime;
        });

        // Create productivity chart
        var ctx = document.getElementById('productivity-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(tasksByDay),
                datasets: [{
                    label: 'Focus Time (minutes)',
                    data: Object.values(tasksByDay),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Focus Time (minutes)'
                        }
                    }
                }
            }
        });

        // Display top performers
        var sortedUsers = Object.entries(userProductivity).sort((a, b) => b[1] - a[1]);
        var topPerformersHtml = '<h3>Top Performers</h3><ol>';
        sortedUsers.slice(0, 5).forEach(function([cardId, focusTime]) {
            topPerformersHtml += `<li>Card ${
