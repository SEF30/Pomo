var t = TrelloPowerUp.iframe();
var timeLeft = 600; // 10 minutes
var timerInterval;
var audio = new Audio('https://yourdomain.com/tick-tock-sound.mp3'); // Replace with your own hosted audio file

function startTimer() {
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('complete-btn').style.display = 'block';
    document.getElementById('skip-btn').style.display = 'block';
    
    timerInterval = setInterval(function() {
        timeLeft--;
        updateTimerDisplay();
        audio.play();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Focus time is up! Great job!');
        }
    }, 1000);
}

function updateTimerDisplay() {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    document.getElementById('timer').textContent = 
        (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function completeTask() {
    clearInterval(timerInterval);
    var focusTime = Math.round((600 - timeLeft) / 60);
    
    t.get('card', 'shared', 'focusTime', 0).then(function(currentFocusTime) {
        return t.set('card', 'shared', 'focusTime', currentFocusTime + focusTime);
    }).then(function() {
        return t.get('board', 'shared', 'completedTasks', []).then(function(completedTasks) {
            completedTasks.push({
                cardId: t.getContext().card,
                date: new Date().toISOString(),
                focusTime: focusTime,
                action: 'completed'
            });
            return t.set('board', 'shared', 'completedTasks', completedTasks);
        });
    }).then(function() {
        t.closePopup();
    });
}

function skipTask() {
    clearInterval(timerInterval);
    t.get('board', 'shared', 'completedTasks', []).then(function(completedTasks) {
        completedTasks.push({
            cardId: t.getContext().card,
            date: new Date().toISOString(),
            action: 'skipped'
        });
        return t.set('board', 'shared', 'completedTasks', completedTasks);
    }).then(function() {
        t.closePopup();
    });
}

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('complete-btn').addEventListener('click', completeTask);
document.getElementById('skip-btn').addEventListener('click', skipTask);
