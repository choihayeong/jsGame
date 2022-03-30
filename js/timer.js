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