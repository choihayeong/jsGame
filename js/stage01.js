// default front
const front = document.querySelector('#front');
const frontEle = front.querySelector('.front > span');
const frontResult = front.querySelector('.front__result');

const eleArr = ['rock','scissors','paper'];
const rndNum = Math.floor(Math.random() * eleArr.length);

frontEle.dataset.name = eleArr[rndNum];

function frontEmoji() {
    switch(frontEle.dataset.name) {
        case 'rock':
            frontEle.textContent = '✊';
            break;
        case 'scissors':
            frontEle.textContent = '✌';
            break;
        case 'paper':
            frontEle.textContent = '🖐';
            break;
    }
}

let nIntervId;

function changeFront() {
    if (!nIntervId) {
        nIntervId = setInterval(flashFront, 100);
    }
}

function flashFront() {
    let frontEleName = frontEle.dataset.name;

    if (frontEleName === 'scissors') {
        frontEle.dataset.name = 'rock';
    } else if (frontEleName === 'rock') {
        frontEle.dataset.name = 'paper';
    } else {
        frontEle.dataset.name = 'scissors';
    }

    frontEmoji();
}

function stopFrontFlash() {
    clearInterval(nIntervId);
    
    const frontEleName = frontEle.dataset.name;

    frontResult.dataset.name = frontEleName;
    frontResult.textContent = `Front chooses ${frontEleName}`;
    frontResult.style.display = 'block';
}

frontEmoji();
changeFront();

// 초기 팝업 동작
const playerChoose = document.querySelector('#playerChoose');
const playerButtons = playerChoose.querySelectorAll('.player-choose__button');
const playerResult = playerChoose.querySelector('.player-choose__result');
const playerName = playerChoose.querySelector('#playerName');
const playResult = document.querySelector('#playResult');
const modalPopup = document.querySelector('#modal');
const iptPlayer = modalPopup.querySelector('#iptPlayer');
const playerForm = modalPopup.querySelector('#playerForm');

function playerNameSubmit(event) {
    event.preventDefault();

    modalPopup.style.display = 'none';

    playerName.textContent = iptPlayer.value;
    playerName.style.display = 'inline-block';
}

playerForm.addEventListener('submit', playerNameSubmit);

// player 버튼 동작
function showResult() {
    const frontDataName = frontResult.dataset.name;
    const playerDataName = playerResult.dataset.name;

    let frontPoint=0, playerPoint=0;

    if (frontDataName === 'rock') {
        switch(playerDataName) {
            case 'scissors':
                frontPoint = 1;
                playerPoint = 0;
                break;
            case 'paper':
                frontPoint = 0;
                playerPoint = 1;
                break;
            default: 
                frontPoint = 0;
                playerPoint = 0;
        }
    } else if (frontDataName === 'scissors') {
        switch(playerDataName) {
            case 'rock':
                frontPoint = 0;
                playerPoint = 1;
                break;
            case 'paper':
                frontPoint = 1;
                playerPoint = 0;
                break;
            default: 
                frontPoint = 0;
                playerPoint = 0;
        }
    } else if (frontDataName === 'paper') {
        switch(playerDataName) {
            case 'rock':
                frontPoint = 1;
                playerPoint = 0;
                break;
            case 'scissors':
                frontPoint = 0;
                playerPoint = 1;
                break;
            default: 
                frontPoint = 0;
                playerPoint = 0;
        }
    }

    const playResultText = playResult.querySelector('.play-result__text');

    if (frontPoint > playerPoint) {
        playResultText.textContent = 'You Lose';
    } else if (frontPoint === playerPoint) {
        playResultText.textContent = 'Draw';
    } else {
        playResultText.textContent = 'You Win!';
    }

    playResult.style.display = 'block';
}

function playerClickEvent(event) {
    const btnName = event.target.dataset.name;

    playerResult.dataset.name = btnName;
    playerResult.style.display = 'block';
    playerResult.textContent = `You choose ${btnName}`;
    
    stopFrontFlash();
    showResult();
}

playerButtons.forEach(ele => {
    ele.addEventListener('click', playerClickEvent);
})

// reset 버튼 동작
const resetBtn = document.querySelector('.btn--reset');

function resetClickEvent() {
    playResult.style.display = 'none';
    frontResult.style.display = 'none';
    playerResult.style.display = 'none';
    nIntervId = setInterval(flashFront, 100);
}

resetBtn.addEventListener('click', resetClickEvent);