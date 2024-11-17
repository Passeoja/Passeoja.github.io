let countdown;
let remainingTime = 60;
let clickCount = 0;
let gameStarted = false;
let nickname = '';
let ranking = [];

function startGame() {
    nickname = document.getElementById('nickname').value.trim();
    if (nickname === '') {
        alert('닉네임을 입력해주세요.');
        return;
    }

    document.getElementById('nickname-container').style.display = 'none';
    document.getElementById('start-btn').disabled = true;
    
    gameStarted = true;
    clickCount = 0;
    updateClickCounter();
    startCountdown();
}

function startCountdown() {
    countdown = setInterval(function() {
        if (remainingTime <= 0) {
            clearInterval(countdown);
            gameEnded();
        } else {
            remainingTime--;
            document.getElementById('counter').textContent = formatTime(remainingTime);
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`;
}

function changeColor() {
    if (!gameStarted) return;
    
    const colors = ['#FF6347', '#FFD700', '#32CD32', '#1E90FF', '#8A2BE2'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById('color-box').style.backgroundColor = randomColor;
    clickCount++;
    updateClickCounter();
}

function updateClickCounter() {
    document.getElementById('click-counter').textContent = `클릭 횟수: ${clickCount}`;
}

function gameEnded() {
    alert(`게임 종료! 당신의 점수는 ${clickCount}번 클릭입니다.`);
    
    ranking.push({ nickname, score: clickCount });
    ranking.sort((a, b) => b.score - a.score);

    if (ranking.length > 5) {
        ranking = ranking.slice(0, 5);
    }

    updateRanking();
    resetGame();
}

function updateRanking() {
    const rankingList = document.getElementById('ranking-list');
    rankingList.innerHTML = '';
    
    ranking.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.nickname} - ${entry.score}회 클릭`;
        rankingList.appendChild(listItem);
    });
}

function resetGame() {
    remainingTime = 60;
    document.getElementById('counter').textContent = formatTime(remainingTime);
    document.getElementById('nickname-container').style.display = 'block';
    document.getElementById('start-btn').disabled = false;
    document.getElementById('nickname').value = '';
    gameStarted = false;
}
