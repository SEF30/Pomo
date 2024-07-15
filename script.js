const key = 'febe0404d05dc33a9be76d3e4f5ab884';
const token = 'ATTAd0a6f49c4f8065e2d98e31758c0b38dedeacf45a29bc65bf2d37016984260a7cAAB90212';
const boardId = 'bS29IQKz';

let lists = [];
let cards = [];
let currentCardIndex = 0;
let timer;
let startTime;
let pauseTime = 0;
let score = 0;
let results = [];
let totalOvertime = 0;
let isPaused = false;
let cardStatuses = {};
let cardsCompleted = 0;
let sessionStartTime;
let previousAverage = 0;
let level = 1;
let pointMultiplier = 1;
let isRushMode = false;
let badges = {
    speed: false,
    accuracy: false,
    consistency: false
};

function fetchLists() {
    fetch(`https://api.trello.com/1/boards/${boardId}/lists?cards=open&key=${key}&token=${token}`)
        .then(response => response.json())
        .then(data => {
            lists = data;
            const listSelect = document.getElementById('listSelect');
            lists.forEach(list => {
                const option = document.createElement('option');
                option.value = list.id;
                option.textContent = `${list.name} (${list.cards.length} cartes)`;
                listSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Erreur:', error));
}

function fetchCards() {
    const listId = document.getElementById('listSelect').value;
    const selectedList = lists.find(list => list.id === listId);
    cards = selectedList.cards;
    currentCardIndex = 0;
    cardsCompleted = 0;
    sessionStartTime = Date.now();
    updateStats();
    showNextCard();
}

function showNextCard() {
    if (currentCardIndex >= cards.length) {
        alert('Félicitations ! Vous avez traité toutes les cartes.');
        document.getElementById('gameArea').style.display = 'none';
        document.getElementById('startBtn').style.display = 'block';
        stopTickSound();
        return;
    }
    const card = cards[currentCardIndex];
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = `<div class="card-title">${card.name}</div>`;
    cardContainer.onclick = () => window.open(card.shortUrl, '_blank');
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    startTime = Date.now() - pauseTime;
    pauseTime = 0;
    let timeLeft = isRushMode ? 300 : 600; // 5 minutes pour le mode Rush, 10 minutes sinon
    document.getElementById('timer').textContent = formatTime(timeLeft);
    playTickSound();
    timer = setInterval(() => {
        if (!isPaused) {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            timeLeft = Math.max(timeLeft - 1, 0);
            document.getElementById('timer').textContent = formatTime(timeLeft);
            if (timeLeft <= 0) {
                clearInterval(timer);
                stopTickSound();
                alert('Temps écoulé pour cette carte.');
                recordResult();
            }
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function recordResult(status = 'Terminé') {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const overtime = Math.max(timeSpent - (isRushMode ? 300 : 600), 0);
    totalOvertime += overtime;
    const pointsEarned = (status === 'Client Potentiel' ? 100 : 50) * pointMultiplier;
    score += pointsEarned;
    results.push({
        cardName: cards[currentCardIndex].name,
        timeSpent: formatTime(timeSpent),
        overtime: formatTime(overtime),
        status: status,
        pointsEarned: pointsEarned
    });
    cardStatuses[status] = (cardStatuses[status] || 0) + 1;
    document.getElementById('score').textContent = `Score: ${score}`;
    cardsCompleted++;
    updateStats();
    checkLevelUp();
    checkBadges();
    currentCardIndex++;
    showNextCard();
}

function updateStats() {
    const elapsedHours = (Date.now() - sessionStartTime) / 3600000;
    const currentAverage = cardsCompleted / elapsedHours;
    
    document.getElementById('cardsCompleted').textContent = cardsCompleted;
    document.getElementById('currentAverage').textContent = currentAverage.toFixed(2);
    document.getElementById('previousAverage').textContent = previousAverage.toFixed(2);
}

function playTickSound() {
    const audio = document.getElementById('tickSound');
    audio.volume = 1; // Volume maximum
    audio.play();
}

function stopTickSound() {
    const audio = document.getElementById('tickSound');
    audio.pause();
    audio.currentTime = 0;
}

function checkLevelUp() {
    const newLevel = Math.floor(cardsCompleted / 10) + 1;
    if (newLevel > level) {
        level = newLevel;
        document.getElementById('level').textContent = `Niveau: ${level}`;
        alert(`Félicitations ! Vous êtes passé au niveau ${level} !`);
    }
}

function checkBadges() {
    if (cardsCompleted >= 50 && !badges.speed) {
        badges.speed = true;
        addBadge('speed', 'Vitesse');
    }
    if (score >= 5000 && !badges.accuracy) {
        badges.accuracy = true;
        addBadge('accuracy', 'Précision');
    }
    if (cardsCompleted >= 100 && !badges.consistency) {
        badges.consistency = true;
        addBadge('consistency', 'Constance');
    }
}

function addBadge(type, name) {
    const badgesContainer = document.getElementById('badges');
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = name;
    badgesContainer.appendChild(badge);
    alert(`Vous avez obtenu le badge ${name} !`);
}

function activatePowerUp(type) {
    if (type === 'multiplier' && score >= 50) {
        score -= 50;
        pointMultiplier = 2;
        setTimeout(() => { pointMultiplier = 1; }, 60000); // 1 minute de boost
        alert('Multiplicateur x2 activé pour 1 minute !');
    } else if (type === 'time' && score >= 100) {
        score -= 100;
        clearInterval(timer);
        startTime -= 30000; // Ajoute 30 secondes
        startTimer();
        alert('30 secondes ajoutées !');
    } else {
        alert('Pas assez de points pour activer ce power-up !');
    }
    document.getElementById('score').textContent = `Score: ${score}`;
}

function spinWheel() {
    if (score >= 200) {
        score -= 200;
        document.getElementById('score').textContent = `Score: ${score}`;
        const wheel = document.getElementById('wheel');
        const spinner = document.getElementById('spinner');
        const degrees = Math.floor(Math.random() * 360) + 720; // Au moins 2 tours complets
        wheel.style.transition = 'transform 5s ease-out';
        wheel.style.transform = `rotate(${degrees}deg)`;
        setTimeout(() => {
            const prize = Math.floor((degrees % 360) / 60);
            let prizeText;
            switch(prize) {
                case 0: prizeText = '100 points bonus !'; score += 100; break;
                case 1: prizeText = '50 points bonus !'; score += 50; break;
                case 2: prizeText = 'Multiplicateur x2 pour 2 minutes !'; 
                        pointMultiplier = 2;
                        setTimeout(() => { pointMultiplier = 1; }, 120000);
                        break;
                case 3: prizeText = '30 secondes bonus !';
                        clearInterval(timer);
                        startTime -= 30000;
                        startTimer();
                        break;
                case 4: prizeText = '200 points bonus !'; score += 200; break;
                case 5: prizeText = 'Pas de chance, rien gagné...'; break;
            }
            alert(`Résultat de la roue : ${prizeText}`);
            document.getElementById('score').textContent = `Score: ${score}`;
            wheel.style.transition = 'none';
            wheel.style.transform = 'rotate(0deg)';
        }, 5000);
    } else {
        alert('Pas assez de points pour tourner la roue !');
