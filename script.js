// Selecting elements
const timerDisplay = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const timerContainer = document.getElementById("timerDisplay");

let isRunning = false;
let interval;
let minutes = 00;
let seconds = 00;

// Function to update timer display
function updateTimer() {
    timerDisplay.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Start/Stop button functinality
startButton.addEventListener("click", function () {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = "Stop";
        timerContainer.style.border = "1px solid lightgray";
        
        interval = setInterval (() => {
            if (seconds > 0 || minutes > 0) {
                seconds--;
                if (seconds === 0 && minutes > 0) {
                    seconds = 59;
                    minutes--;
                }
                updateTimer();
            } else {
                clearInterval(interval);
                isRunning = false;
                startButton.textContent = "Start";
            }
        }, 1000);
    } else {
        clearInterval(interval);
        isRunning = false;
        startButton.textContent = "Start";
        timerContainer.style.border = "2px solid red";
    }
});

// Reset button functionality
resetButton.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    minutes = 00;
    seconds = 00;
    updateTimer();
    startButton.textContent = "Start";
});
