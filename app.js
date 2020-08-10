/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var currentPlayer, diceRoll, currentScore, playerScores, winningScore, isGameOver;
var currentScoreUI, playerScoreUI;

initVars();


/*
********************************************************************
Event Listeners
********************************************************************
*/

//Dice Roll
document.querySelector(".btn-roll").addEventListener("click", function(){

  if(!isGameOver){
    diceRoll = Math.floor(Math.random()*6+1);

    document.querySelector('.dice').src = 'dice-' + diceRoll + '.png';
    document.querySelector('.dice').style.display = 'block'

    if(diceRoll!==1)
    {
      currentScore += diceRoll;
      currentScoreUI[currentPlayer].textContent = currentScore;
    }
    else
    {
      //change the player
      switchPlayer();
    }
  }
  
});

//Hold Score
document.querySelector(".btn-hold").addEventListener("click", function(){
  if(!isGameOver)
  {
    playerScores[currentPlayer] += currentScore;
    playerScoreUI[currentPlayer].textContent = playerScores[currentPlayer];
    document.querySelector('.dice').style.display = 'none';

    if(playerScores[currentPlayer]>=winningScore)
    {
      document.querySelector('.player-'+ currentPlayer +'-panel').classList.add('winner');
      document.querySelector('.player-'+ currentPlayer +'-panel').classList.toggle('active');
      document.querySelector('#name-'+currentPlayer).textContent = 'WINNER!';
      isGameOver = true;
    }
    else
    {
      switchPlayer();
    }
  }
  
})

//New Game
document.querySelector('.btn-new').addEventListener("click", function(){
  initVars();
})

/*
********************************************************************
Functions
********************************************************************
*/

//Initialize Variables
function initVars()
{
  winningScore = 20;
  isGameOver = false;
  currentPlayer = 0;
  diceRoll = 0;
  currentScore = 0;
  playerScores = [0,0];
  currentScoreUI = [document.querySelector('#current-0'), document.querySelector('#current-1')];
  currentScoreUI[0].textContent = '0';
  currentScoreUI[1].textContent = '0';
  playerScoreUI = [document.querySelector('#score-0'), document.querySelector('#score-1')];
  playerScoreUI[0].textContent = '0';
  playerScoreUI[1].textContent = '0';
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('#name-0').textContent = 'PLAYER 1';
  document.querySelector('#name-1').textContent = 'PLAYER 2';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-'+ currentPlayer +'-panel').classList.add('active');
}

function switchPlayer()
{
  currentScoreUI[currentPlayer].textContent = '0';
  currentPlayer = currentPlayer===1 ? 0 : 1;
  currentScore = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}