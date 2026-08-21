// Sound functions using Web Audio API
function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    oscillator.frequency.value = 800; // Hz (pitch)
    oscillator.type = "sine";
    
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playFinishSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Play 3 ascending beeps (magical chime effect)
    const frequencies = [523, 659, 784]; // C, E, G (musical notes)
    let delay = 0;
    
    frequencies.forEach((freq) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = "sine";
        
        gain.gain.setValueAtTime(0.3, audioContext.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + 0.3);
        
        oscillator.start(audioContext.currentTime + delay);
        oscillator.stop(audioContext.currentTime + delay + 0.3);
        
        delay += 0.25;
    });
}

// Selecting elements
const timerDisplay = document.getElementById("time");
const startButton = document.getElementById("startBtn");
const resetButton = document.getElementById("resetBtn");
const closeButton = document.getElementById("closeBtn");
const timerContainer = document.getElementById("timerDisplay");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const inputContainer = document.getElementById("inputContainer");

let isRunning = false;
let interval;
let minutes = 1;
let seconds = 30;

// Function to update timer display
function updateTimer() {
    const displayMin = minutes < 10 ? '0' + minutes : minutes;
    const displaySec = seconds < 10 ? '0' + seconds : seconds;
    timerDisplay.innerHTML = `${displayMin}:${displaySec}`;
}

// Update timer when user changes input
minutesInput.addEventListener("change", function () {
    if (!isRunning) {
        minutes = parseInt(this.value) || 0;
        if (minutes > 59) minutes = 59;
        if (minutes < 0) minutes = 0;
        updateTimer();
    }
});

secondsInput.addEventListener("change", function () {
    if (!isRunning) {
        seconds = parseInt(this.value) || 0;
        if (seconds > 59) seconds = 59;
        if (seconds < 0) seconds = 0;
        updateTimer();
    }
});

// Start/Stop button functionality
startButton.addEventListener("click", function () {
    if (!isRunning) {
        // Validate input
        if (minutes === 0 && seconds === 0) {
            alert("Please set a time!");
            return;
        }
        
        playClickSound(); // Play "tok" sound
        isRunning = true;
        startButton.textContent = "Stop";
        inputContainer.style.display = "none"; // Hide inputs while running
        timerContainer.style.border = "1px solid lightgray";
        
        interval = setInterval(() => {
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
                inputContainer.style.display = "flex"; // Show inputs again
                playFinishSound(); // Play finish sound
            }
        }, 1000);
    } else {
        clearInterval(interval);
        isRunning = false;
        startButton.textContent = "Start";
        inputContainer.style.display = "flex"; // Show inputs again
        timerContainer.style.border = "1px solid #e0e0e0";
    }
});

// Reset button functionality
resetButton.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    minutes = parseInt(minutesInput.value) || 0;
    seconds = parseInt(secondsInput.value) || 0;
    updateTimer();
    startButton.textContent = "Start";
    inputContainer.style.display = "flex"; // Show inputs again
    timerContainer.style.border = "1px solid #e0e0e0";
});

// Close button functionality
closeButton.addEventListener("click", function () {
    clearInterval(interval);
    isRunning = false;
    minutes = 1;
    seconds = 30;
    minutesInput.value = 1;
    secondsInput.value = 30;
    updateTimer();
    startButton.textContent = "Start";
    inputContainer.style.display = "flex";
    timerContainer.style.border = "1px solid #e0e0e0";
});

// Initialize display
updateTimer();