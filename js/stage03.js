let frontRow = 3;
let frontCol = 4;

let cntArr = frontRow * frontCol;

let ObjsArr = [
    { card: '😎', isOpen: false },
    { card: '🎈', isOpen: false },
    { card: '🎃', isOpen: false },
    { card: '🥨', isOpen: false },
    { card: '🌂', isOpen: false },
    { card: '🧶', isOpen: false },
    { card: '💎', isOpen: false },
    { card: '🔮', isOpen: false },
    { card: '🔑', isOpen: false },
    { card: '🍦', isOpen: false },
    { card: '🚍', isOpen: false },
    { card: '🚀', isOpen: false },
    { card: '🌌', isOpen: false },
    { card: '🌈', isOpen: false },
];

ObjsArr = ObjsArr.sort(() => Math.random() - Math.random());

const dummyCards = document.querySelector('#dummyCards');

// default state
function showDefaultFront() {
    dummyCards.innerHTML = '';

    for (let i=0; i < ObjsArr.length; i++) {
        ObjsArr[i]['isOpen'] = false;
    }

    for (let i = 0; i < cntArr; i++) {
        if ((i+1) % frontCol === 0) {
            dummyCards.innerHTML += `<button type="button" data-open="false" class="btn-card">🃏</button> <br>`;
        } else {
            dummyCards.innerHTML += `<button type="button" data-open="false" class="btn-card">🃏</button>`;
        }
    }
}

showDefaultFront();

let frontCardArr = [];

for (let i = 0; i < cntArr; i++) {
    frontCardArr.push('🃏');
}

const playBtn = document.querySelector('.btn--play');

function generateMixingCards() {
    for(let i=0; i < (frontCardArr.length); i+=2){
        frontCardArr[i] = ObjsArr[i / 2]['card'];
        frontCardArr[i + 1] =ObjsArr[i / 2]['card'];
    }

    frontCardArr = frontCardArr.sort(() => Math.random() - Math.random());
}

function showFrontBoard() {
    generateMixingCards();

    dummyCards.innerHTML = '';

    for (let i=0; i < ObjsArr.length; i++) {
        ObjsArr[i]['isOpen'] = true;
    }

    for (let i = 0; i < cntArr; i++) {
        if ((i+1) % frontCol === 0) {
            dummyCards.innerHTML += `<button type="button" data-open="true" class="btn-card">${frontCardArr[i]}</button> <br>`;
        } else {
            dummyCards.innerHTML += `<button type="button" data-open="true" class="btn-card">${frontCardArr[i]}</button>`;
        }
    }
}

// ...ing 
// measure time
const playResult = document.querySelector('#playResult');
const playTimeResult = playResult.querySelector('.play-result__score');
let initTime = 0;
let stopwatch = true;

function measuringTime() {
    stopwatch = setInterval(function(){
        initTime = initTime + 1;

        playTimeResult.innerHTML = `<span>${initTime}</span>초 걸렸습니다!`;
    },1000);
}

function playingGame() {
    const cardBtns = document.querySelectorAll('.btn-card');
    let clk = 0;
    let beforeCard, currentCard;

    function chkResult() {
        let chkarr = [];

        cardBtns.forEach(ele => {
            chkarr.push(ele.dataset.open);
        });
        
        return chkarr.filter(ele => ele === 'true');
    }

    cardBtns.forEach((ele,index) => {
        function cardBtnClickEvent() {
            clk = clk + 1;

            ele.textContent = frontCardArr[index];
            ele.dataset.open = true;

            if (clk % 2 === 0) {
                const statusBefore = document.querySelector('[data-status="before"].btn-card');

                currentCard = ele.textContent;
                ele.dataset.status = 'current';

                if (beforeCard !== currentCard) {
                    // setInterval(function() {
                    //     statusBefore.textContent = '🃏';
                    //     ele.textContent = '🃏';
                    // }, 500);

                    statusBefore.textContent = '🃏';
                    ele.textContent = '🃏';

                    statusBefore.removeAttribute('data-status');
                    ele.removeAttribute('data-status');

                    statusBefore.dataset.open = 'false';
                    ele.dataset.open = 'false';
                } else {
                    statusBefore.removeAttribute('data-status');
                    ele.removeAttribute('data-status');

                    statusBefore.disabled = true;
                    ele.disabled = true;
                }
            } else {
                beforeCard = ele.textContent;
                ele.dataset.status = 'before';
            }

            // game set check
            let openChk = chkResult();

            if (openChk.length === cntArr) {
                clearInterval(stopwatch);
                showResult();
            }
        }

        ele.addEventListener('click', cardBtnClickEvent);
    });
}

// show result
function showResult() {
    playResult.style.display = 'block';
    playResult.dataset.result = 'set';
}

// timer
const frontTimer = document.querySelector('#timer');
let setTime = 5;
let timer = true;

function timingFunc() {
    if (!timer) {
        timer = setInterval(function() {
            setTime = setTime - 1;
        
            if (setTime === 0) {
                clearInterval(timer);
                frontTimer.style.display = 'none';

                showDefaultFront();
                playingGame();
                measuringTime();
            }
        
            frontTimer.textContent=`${setTime}s`;
        }, 1000);
    }
}

function playClickEvent(event) {
    event.target.disabled = true;
    timer = false;

    showFrontBoard();
    timingFunc();
}

playBtn.addEventListener('click', playClickEvent);

// reset 버튼 동작
const resetBtn = document.querySelector('.btn--reset');

function resetClickEvent() {
    location.reload();
}

resetBtn.addEventListener('click', resetClickEvent);

// next stage
const nextBtn = document.querySelector('.btn--nextstage');

function nextStageEvent() {
    // row & col 증가 및 front 배열 초기화
    frontRow ++;
    frontCol ++;
    cntArr = frontRow * frontCol;
    frontArr = [];

    dummyCards.innerHTML = '';

    showDefaultFront();

    playResult.style.display = 'none';

    playBtn.disabled = false;
}

nextBtn.addEventListener('click', nextStageEvent);