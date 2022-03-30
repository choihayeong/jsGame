// default setting
let frontRow = 4;
let frontCol = 8;
let frontArr = [];
let stageNum = 0;

let cntArr = frontRow * frontCol;

const charArrsObj = [
    ['각','갂','갃','갘','갞','갟',],
    ['갅','갆','갡'],
    ['갉','갊','갋','갌','갍','갎','갏'],
    ['낝','낞','낣','낥','낦','낧','낶'],
    ['닧','닩','닪','닱','댂','댃','댅','댆'],
    ['띾','락','띿'],
    ['랁','랂'],
    ['랅','랆','랇','랈','랉','랊','랋'],
    // more & more...
];

let rndNumsArr = [];

function generateRandomNums(rndObjNum, rndNum01, rndNum02) {
    rndObjNum = Math.floor(Math.random() * charArrsObj.length);
    rndNum01 = Math.floor(Math.random() * charArrsObj[rndObjNum].length);
    rndNum02 = Math.floor(Math.random() * charArrsObj[rndObjNum].length);

    while (rndNum01 === rndNum02) {
        rndNum02 = Math.floor(Math.random() * charArrsObj[rndObjNum].length);
    }

    return [rndObjNum, rndNum01, rndNum02];
}

function generateDummyChars(frontCol) {
    rndNumsArr = generateRandomNums();

    const frontMainChar = charArrsObj[rndNumsArr[0]][rndNumsArr[1]];
    // const frontMainChar = charArrsObj[rndObjNum][rndNum01];

    for (let i = 0; i < cntArr; i++) {
        frontArr.push(frontMainChar);
    }

    rndNum03 = Math.floor(Math.random() * frontArr.length);

    const frontDifChar = charArrsObj[rndNumsArr[0]][rndNumsArr[2]];
    // const frontDifChar = charArrsObj[rndObjNum][rndNum02];

    frontArr[rndNum03] = frontDifChar;

    const dummyChars = document.querySelector('#dummyChars');

    for (let i = 0; i < cntArr; i++) {
        if ((i+1) % frontCol === 0) {
            dummyChars.innerHTML += `<button type="button" class="btn-char">${frontArr[i]}</button> <br>`;
        } else {
            dummyChars.innerHTML += `<button type="button" class="btn-char">${frontArr[i]}</button>`;
        }
    }

    return rndNum03;
}

let differNum = generateDummyChars(frontCol);

const playResult = document.querySelector('#playResult');
const playResultText = playResult.querySelector('.play-result__text');
const playScore = playResult.querySelector('.play-result__score');

// play Event
function playEvent() {
    const charBtns = document.querySelectorAll('.btn-char');

    charBtns.forEach((ele,index) => {
        function showResult() {
            if (index === differNum) {
                playResultText.textContent = 'You find it!';
                playResultText.dataset.result = 'win';
                stageNum = stageNum + 1;

                nextStageEvent();
            } else {
                playResultText.textContent = 'Try again!';
                playResultText.dataset.result = 'lose';

                playResult.style.display = 'block';
            }
        }

        ele.addEventListener('click', showResult);
    })
}

playEvent();

// reset & try again 버튼 동작
const resetBtn = document.querySelector('.btn--reset');
const tryBtn = document.querySelector('.btn--try');

function resetClickEvent() {
    location.reload();
}

function tryAgainEvent() {
    playResult.style.display = 'none';
}

resetBtn.addEventListener('click', resetClickEvent);
tryBtn.addEventListener('click', tryAgainEvent);

// next stage
const nextBtn = document.querySelector('.btn--nextstage');

function nextStageEvent() {
    // row & col 증가 및 front 배열 초기화
    frontRow ++;
    frontCol ++;
    cntArr = frontRow * frontCol;
    frontArr = [];

    dummyChars.innerHTML = '';

    differNum = generateDummyChars(frontCol);

    playResult.style.display = 'none';

    playEvent();
}

nextBtn.addEventListener('click', nextStageEvent);

// timer
const frontTimer = document.querySelector('#timer');
let setTime = 30;
let timer = true;

function timingFunc() {
    if (!timer) {
        timer = setInterval(function() {
            setTime = setTime - 1;
        
            if (setTime === 0) {
                clearInterval(timer);
        
                playResultText.textContent = `Time's up!`;
                playScore.innerHTML = `<span>${stageNum}</span>단계 통과`;
                playResult.style.display = 'block';
                playScore.style.display = 'block';
                playResultText.dataset.result = '';
            }
        
            frontTimer.textContent=`${setTime}s`;
        }, 1000);
    }
}

const modal = document.querySelector('#modal');
const playBtn = modal.querySelector('.btn--play');

function playClickEvent() {
    modal.style.display = 'none';
    timer = false;

    timingFunc();
}

playBtn.addEventListener('click', playClickEvent);