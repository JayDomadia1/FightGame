/* 
🌟 APP: Fighting Game
*/

// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1, p2, gameState) => {
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health
  // Update the DOM with the names and the latest health of players
  if (p1.health <= 0) {
    p1Health.innerText = 0
    game.isOver = true
    gameState = game.isOver
    resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
    return gameState
  }
  else if (p2.health <= 0) {
    p2HealthDiv.innerText = 0
    game.isOver = true
    gameState = game.isOver
    resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
    return gameState
  }
  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
}


class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }

  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike(player, enemy, attackDmg) {
    let damageAmount = Math.ceil(Math.random() * attackDmg)

    // Get random number between 1 - 10 and that is damageAmount
    if (enemy.health - damageAmount > 0) {
      enemy.health -= damageAmount
    }
    else if (enemy.health - damageAmount <= 0 && player.health > 0) {
      enemy.health = 0
      gameState = true
      game.declareWinner(gameState, player, enemy)
    }
    // Subtract the enemy health with the damageAmount
    updateGame(p1, p2, gameState)
    //  Update the game and DOM with updateGame()
    console.log(`${player.name} attacks ${enemy.name} for ${damageAmount}`)
    return `${player.name} attacks ${enemy.name} for ${damageAmount}`
    //  Return a message of 'player name attacks enemy name for damageAmount'
  }
  // ** Heal the player for random number from  1 to 5 **
  heal(player) {
    let hpAmount = Math.ceil(Math.random() * 5)
    // Get random number between 1 - 5 and store that in hpAmount
    if (player.health > 0 && player.health <= 100) {
      player.health += hpAmount
      if (player.health + hpAmount > 100) {
        player.health = 100
      }
    }
    else {
      gameState = true
    }
    // Add hpAmount to players health
    updateGame(p1, p2, gameState)
    //  Update the game and DOM with updateGame()
    console.log(`${player.name} heals for ${hpAmount} HP`)
    return `${player.name} heals for ${hpAmount} HP`
    //  Return a message of 'player name heals for hpAmount HP'

  }
}

// ** Create the Game class with all it's attributes and methods to run a match **
// game = new Game()
// game.isOver 👉 false

class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver, p1, p2) {
    let message
    // Create a message variable that will hold a message based on the condition
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} Wins`
    }
    // If isOver is true AND p1 health is <= 0 then update message variable  to 'p1 WINS!'
    else if (isOver == true && p2.health <= 0) {
      message = `${p1.name} Wins`
    }
    // Else if isOver is true AND p2 health is <= 0 then update message variable  to 'p2 WINS!'
    document.getElementById(`victory`).play()
    // Play victory sound
    return message
    // Return message variable 

  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1, p2) {
    console.log(`reset`)
    p1.health = 100
    p2.health = 100
    updateGame(p1, p2)
    this.isOver = false
    // set p1 health and p2 health back to 100 and isOver back to false and clear resultDiv.innerText and don't forget to updateGame()
  }

  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    // Reset to make sure player health is back to full before starting
    this.reset(p1, p2)
    // Make sure the players take turns untill isOver is TRUE
    while (!this.isOver) {
      p1.strike(p1, p2, p1.attackDmg)
      p2.heal(p2)
      p2.strike(p2, p1, p2.attackDmg)
      p1.heal(p1)

      //Make sure both players get strike() and heal() once each loop
    }
    return this.declareWinner(this.isOver, p1, p2)
    // Once isOver is TRUE run the declareWinner() method 
  }
}
// ** Create 2 players using the player class **
let Jay = new Player(`Jay`, 100, 10)
let Raj = new Player(`Raj`, 100, 10)
// ** Save original Player Data into a variable in order to reset **
let p1 = Jay;
let p2 = Raj;
// ** Create the game object from the Game class **
let game = new Game();
// ** Intialize the game by calling updateGame() **
updateGame(p1, p2)
// ** Save intial isOver from the game object inside this variable **
let gameState = game.isOver;

playButton.onclick = () => result.innerText = game.play(p1, p2)
// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
// Add functionality where players can press a button to attack OR heal

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if (e.key == 'q' && p2.health >= 0 && game.isOver == false) {
    p1.strike(p1, p2, p1.attackDmg)
    document.getElementById(`p1attack`).play()
  }

  // After striking then play attack sound

});

document.addEventListener('keydown', function(e) {
  if (e.key == 'a' && p1.health > 0 && game.isOver == false) {
    p1.heal(p1)
    document.getElementById(`p1heal`).play()
  }
  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()

  // After healing then play heal sound

});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {

  if (e.key == 'p' && p2.health >= 0 && game.isOver == false) {
    p2.strike(p2, p1, p2.attackDmg)
    document.getElementById(`p2attack`).play()
  }
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()

  // After striking then play attack sound

});

document.addEventListener('keydown', function(e) {
  if (e.key == 'l' && p2.health > 0 && game.isOver == false) {
    p2.heal(p2)
    document.getElementById(`p2heal`).play()
  }
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()

  // After healing then play heal sound

});





