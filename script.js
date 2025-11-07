// Quick Settings
const raceDuration = 10000; // 10 seconds
const characterSpeed = 5; // Pixels per interval
let gameInterval, obstacleInterval;
let score = 0;
let raceInProgress = false;

// DOM elements
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const character = document.getElementById('character');
const scoreboard = document.getElementById('scoreboard');
const finalScore = document.getElementById('final-score');

// Start the race
function startRace() {
  if (raceInProgress) return;

  raceInProgress = true;
  score = 0;
  finalScore.textContent = `Final Score: ${score}`;
  scoreboard.classList.add('hidden');

  // Move the character randomly across the screen
  let moveDirection = 1; // 1: right, -1: left
  const moveCharacter = () => {
    const leftPosition = character.offsetLeft;
    if (leftPosition >= 250 || leftPosition <= 0) {
      moveDirection *= -1;
    }
    character.style.left = leftPosition + (moveDirection * characterSpeed) + 'px';
  };

  gameInterval = setInterval(moveCharacter, 100);

  // Simulate obstacles
  generateObstacles();

  // End the race after the given duration
  setTimeout(endRace, raceDuration);
}

// Generate obstacles randomly
function generateObstacles() {
  obstacleInterval = setInterval(() => {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.random() * 250}px`; // Random X position
    obstacle.style.top = '0px'; // Start from the top
    obstacle.style.position = 'absolute';
    obstacle.style.width = '30px';
    obstacle.style.height = '30px';
    obstacle.style.backgroundColor = 'red';
    document.querySelector('.race-track').appendChild(obstacle);
    
    // Move obstacles down
    const moveObstacle = () => {
      const topPosition = obstacle.offsetTop;
      if (topPosition > 400) {
        obstacle.remove();
      } else {
        obstacle.style.top = `${topPosition + 2}px`; // Move down
      }
    };
    setInterval(moveObstacle, 50);
  }, 1500); // Every 1.5 seconds
}

// End the race
function endRace() {
  clearInterval(gameInterval);
  clearInterval(obstacleInterval);

  scoreboard.classList.remove('hidden');
  finalScore.textContent = `Your Final Score: ${score}`;
  raceInProgress = false;
}

// Restart the game
function restartGame() {
  score = 0;
  startRace();
}

startButton.addEventListener('click', startRace);
restartButton.addEventListener('click', restartGame);
