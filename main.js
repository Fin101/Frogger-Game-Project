function setUpGame() {
  // dom selection now work in here
  // loadGrid()
  loadStartScreen()
}

let morty = 10
const carsArrayLeft = [20, 29, 38, 45, 57, 62, 70, 77, 89, 99, 105, 114, 124, 133, 139, 146, 150, 155, 160, 167, 171, 174, 187, 195]
const carsArrayRight = [200, 208, 217, 222, 235, 245, 255, 260, 270, 278, 288, 296, 300, 309, 315, 325, 330, 340, 346, 354, 361, 370, 376]
// const dragonBallsArray = [30, 46, 56, 60, 69, 80, 90, 97, 103, 111, 120, 129, 140, 149, 156, 165, 170, 180, 188, 199, 210, 221, 233, 249, 261, 272, 280, 289, 295, 310, 316, 326, 335, 343, 355, 362, 372]
// const dragonBallsArray = ['ball1', 'ball2', 'ball3', 'ball4', 'ball5']
// RandomCellId = 'cell_' + Math.round(Math.random() * 360 + 19)
// console.log(RandomCellId)
const cellsArrayRight = [19, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299, 319, 339, 359, 379, 399]
const cellsArrayLeft = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380]
const width = 20
const gridCellCount = width * width
const cells = []

const audioShowMe = new Audio()
audioShowMe.src = 'audio/Show_me_what_you_got!.wav'
audioShowMe.volume = 0.3

const audioMyMan = new Audio()
audioMyMan.src = 'audio/my_man.wav'

const audioDubDub = new Audio()
audioDubDub.src = 'audio/woo_vu_luvub_dub_dub.wav'
audioDubDub.volume = 0.4

const audioOwee = new Audio()
audioOwee.src = 'audio/owee_(1).wav'

const audioCoin = new Audio()
audioCoin.src = 'audio/coin.wav'
audioCoin.playbackRate = 2
audioCoin.volume = 0.1

// const countdownAudio = new Audio()
// countdownAudio.src = 'audio/Countdownwav.wav'
// countdownAudio.volume = 0.2

const audioMortyDies = new Audio()
audioMortyDies.src = 'audio/mortyDies.wav'

const backgroundAudio = new Audio()
backgroundAudio.src = 'audio/schwiftybounce.wav'
backgroundAudio.volume = 0.15
backgroundAudio.loop = true

let carIntervalId
let lives = 3
let score = 0
let count = 45
let carRightIntervalId
let carLeftIntervalId
let mortyDiesIntervalId
let gameFinished = false
let loading = true
let startTimer = false

function loadStartScreen() {

  const grid = document.querySelector('.grid')
  const gameOverScreen = document.querySelector('.gameOverScreen')
  const startScreen = document.querySelector('.startScreen')
  const leaderboardScreen = document.querySelector('.leaderboardScreen')
  const startButton = document.querySelector('#startButton')
  const viewLeaderboardButton = document.querySelector('#viewLeaderboardButton')


  if (loading) {
    grid.style.display = 'none'
    gameOverScreen.style.display = 'none'
    leaderboardScreen.style.display = 'none'
    startScreen.style.display = 'block'
  }

  startButton.addEventListener('click', () => {
    audioShowMe.play()
    backgroundAudio.play()
    inPlay()
  })

  viewLeaderboardButton1.addEventListener('click', () => {
    loadLeaderboard()
  })

}

function inPlay() {

  moveMorty()
  moveCarsRight()
  moveCarsLeft()
  loadGrid()

  function loadGrid() {


    const grid = document.querySelector('.grid')
    const gameOverScreen = document.querySelector('.gameOverScreen')
    const startScreen = document.querySelector('.startScreen')
    const leaderboardScreen = document.querySelector('.leaderboardScreen')


    startScreen.style.display = 'none'
    // gameOverScreen.style.display = 'none'
    leaderboardScreen.style.display = 'none'
    grid.style.display = 'flex'

    for (let i = 0; i < gridCellCount; i++) {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      if (i === morty) {
        cell.classList.add('morty')
      }
      // if (dragonBallsArray.includes(i)) {
      //   console.log(i)
      //   cell.classList.add('dragonBalls')
      // }

      if (carsArrayRight.includes(i)) {
        cell.classList.add('carRight')
      }
      if (carsArrayLeft.includes(i)) {
        cell.classList.add('carLeft')
      }
      grid.appendChild(cell)
      cells.push(cell)
      cell.id = i
    }

    for (let i = 0; i < 50; i++) {
      let randomIndex = Math.round(Math.random() * 359 + 20)
      cells[randomIndex].classList.add('dragonBalls')
    }

    for (let i = 0; i < 5; i++) {
      let randomIndex = Math.round(Math.random() * 359 + 20)
      cells[randomIndex].classList.add('blueDragonBalls')
    }

    // for (let i = 0; i < 1; i++) {
    //   // if (count < 40) {
    //   let randomIndex = Math.round(Math.random() * 359 + 20)
    //   cells[randomIndex].classList.add('schmecklesBox')
    //   console.log('schmecklesBox')
    //   // }
    // }

    for (let i = 0; i < 20; i++) {
      cells[i].style.backgroundColor = 'rgba(46, 204, 113, 0.5)'
    }

    for (let i = 380; i < 400; i++) {
      cells[i].style.backgroundColor = 'rgba(46, 204, 113, 0.5)'
    }
  }

  function mortyDies() {

    const livesCounter = document.querySelector('#livesCounter')
    const mrMeeseeksSpeachBox = document.querySelector('.mrMeeseeksSpeachBox')
    const scoreCounter = document.querySelector('#scoreCounter')

    for (let i = 0; i < 399; i++) {
      if (carsArrayLeft.includes(morty) || carsArrayRight.includes(morty)) {
        console.log('hit')
        cells[morty].classList.remove('morty')
        morty = 10
        cells[morty].classList.add('morty')
        livesCounter.innerHTML = `Lives: ${lives -= 1}`
        mrMeeseeksSpeachBox.innerHTML = '"Existance is PAIN Morty!"'
        scoreCounter.innerHTML = `Schmeckles: ${score -= 40}`
        audioMortyDies.play()

        // document.getElementById('livesCounter').classList.add('livesPulse1')
        // if (lives === 1) {
        //   document.getElementById('livesCounter').classList.remove('livesPulse1')
        //   document.getElementById('livesCounter').classList.add('livesPulse2')
        // }
        // if (lives === 0) {
        //   document.getElementById('livesCounter').classList.remove('livesPulse2')
        //   document.getElementById('livesCounter').classList.add('livesPulse3')
        // }  

        livesCounter.classList.add('livesPulse1')
        setTimeout(() => {
          livesCounter.classList.remove('livesPulse1')
        }, 2000)
      }
    }
  }

  function moveMorty() {
    if (gameFinished === true) {
      return
    } else {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
          if (cellsArrayRight.includes(morty)) {
            return
          } else if (morty === cells.length - 1) {
            return
          }
          cells[morty].classList.remove('morty')
          morty += 1
          cells[morty].classList.add('morty')
        } else if (event.key === 'ArrowLeft') {
          if (cellsArrayLeft.includes(morty)) {
            return
          } else if (morty === 0) {
            return
          }
          cells[morty].classList.remove('morty')
          morty -= 1
          cells[morty].classList.add('morty')
        } else if (event.key === 'ArrowUp') {
          if (morty < width) {
            return
          }
          cells[morty].classList.remove('morty')
          morty -= width
          cells[morty].classList.add('morty')
        } else if (event.key === 'ArrowDown') {
          if (morty > cells.length - width - 1) {
            return
          }
          cells[morty].classList.remove('morty')
          morty += width
          cells[morty].classList.add('morty')
        }
        timer()
        dragonBalls()
      })
    }
  }

  function timer() {

    if (startTimer === true) {
      return
    }
    startTimer = true

    const timeCounter = document.querySelector('#timeCounter')
    const mrMeeseeksSpeachBox = document.querySelector('.mrMeeseeksSpeachBox')

    let timer = setInterval(() => {
      // Minus 1 from count each second(1000)
      count--
      timeCounter.innerHTML = `Time: ${count} seconds`
      if (count <= 7) {
        timeCounter.classList.add('secondsPulse')
      }
      // if (count === 3) {
      //   countdownAudio.play()
      // }
    }, 1000)
    const testInterval = setInterval(() => {
      if (count === 0) {
        // If count = 0, call gameover and stopInterval functions
        // stopInterval()
        console.log('times up!')
        clearInterval(timer)
        clearInterval(testInterval)
        gameOver()
        mrMeeseeksSpeachBox.innerHTML = '"Time\'s up Morty"'
      }
      if (lives === 0) {
        console.log('no more lives!')
        // stopInterval()
        clearInterval(testInterval)
        clearInterval(timer)
        gameOver()
      }
    }, 200)

  }

  function moveCarsRight() {
    // setting interval for all the cars
    carRightIntervalId = setInterval(() => {
      // mortyDies()
      // looping through each car
      for (let i = 0; i < carsArrayRight.length; i++) {
        // checking if car is at the end of the row. If the remainder of carsArray[i] divided by width is equal to 19, then we know it's hit the edge of the grid.
        if (carsArrayRight[i] % width === (width - 1)) {
          // If true, we remove class 'cars' from current cell
          cells[carsArrayRight[i]].classList.remove('carRight')
          // we reassign carsArray[i] to equal carsArray[i] - width (beginning of row)
          carsArrayRight[i] = carsArrayRight[i] - width
        }
        // currently = cell 359
        cells[carsArrayRight[i]].classList.remove('carRight')

        carsArrayRight[i]++
        // add 1 cell to equal cell 360
        cells[carsArrayRight[i]].classList.add('carRight')
        // adding car to 360
      }

    }, 300)
  }

  function moveCarsLeft() {
    // mortyDies()
    // setting interval for all the cars
    carLeftIntervalId = setInterval(() => {
      // looping through each car
      for (let i = 0; i < carsArrayLeft.length; i++) {
        // checking if car is at the end of the row (left). If the remainder of carsArray[i] divided by width is equal to 0, then we know it's hit the LEFT edge of the grid.
        if (carsArrayLeft[i] % width === 0) {
          // If true, we remove class 'cars' from current cell
          cells[carsArrayLeft[i]].classList.remove('carLeft')
          // we reassign carsArray[i] to equal carsArray[i] + width (end of row)
          carsArrayLeft[i] = carsArrayLeft[i] + width
        }
        // currently = cell 40
        cells[carsArrayLeft[i]].classList.remove('carLeft')

        carsArrayLeft[i]--
        // minus 1 cell to equal cell 39

        cells[carsArrayLeft[i]].classList.add('carLeft')
        // adding car to 39

      }

    }, 300)
  }

  function dragonBalls() {

    const scoreCounter = document.querySelector('#scoreCounter')
    const mrMeeseeksSpeachBox = document.querySelector('.mrMeeseeksSpeachBox')

    for (let i = 0; i < 399; i++) {
      if (cells[i].className.includes('morty') && cells[i].className.includes('dragonBalls')) {
        cells[i].classList.remove('dragonBalls')
        scoreCounter.innerHTML = `Schmeckles: ${score += 10}`
        audioCoin.play()
        // } else if (cells[i].className.includes('carLeft') && cells[i].className.includes('dragonBalls')) {
        //   cells[i].classList.remove('dragonBalls')
        if (score < 50) {
          document.getElementById('scoreCounter').style.backgroundColor = 'rgba(200, 0, 0, 0.5)'
          mrMeeseeksSpeachBox.innerHTML = '"Oooohh yeeaahhh"'
        } else if (score > 130) {
          document.getElementById('scoreCounter').style.backgroundColor = 'rgba(0, 230, 64, 0.5)'
        } else {
          document.getElementById('scoreCounter').style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
        }
      }
      if (cells[i].className.includes('morty') && cells[i].className.includes('blueDragonBalls')) {
        cells[i].classList.remove('blueDragonBalls')
        scoreCounter.innerHTML = `Schmeckles: ${score += 50}`
        audioMyMan.play()
      }
      // if (cells[i].className.includes('morty') && cells[i].className.includes('schmecklesBox')) {
      //   cells[i].classList.remove('schmecklesBox')
      //   scoreCounter.innerHTML = `Schmeckles: ${score += Math.floor(Math.random() * 150)}`
      // }
    }
  }

  function gameOver() {

    backgroundAudio.pause()
    audioOwee.play()
    timeCounter.classList.remove('secondsPulse')

    const grid = document.querySelector('.grid')
    const gameOverScreen = document.querySelector('.gameOverScreen')
    const viewLeaderboardButton = document.querySelector('#viewLeaderboardButton2')

    if (lives === 0 || count === 0) {
      // console.log(grid)
      gameFinished = true
      clearInterval(carRightIntervalId)
      clearInterval(carLeftIntervalId)
      clearInterval(mortyDiesIntervalId)
      // grid.remove('grid')
      grid.style.display = 'none'
      gameOverScreen.style.display = 'block'
    }

    viewLeaderboardButton2.addEventListener('click', () => {
      console.log('eventListener')
      loadLeaderboard()
    })
  }

  console.log('hello')

  mortyDiesIntervalId = setInterval(() => {
    mortyDies()
  }, 1)

}

function loadLeaderboard() {

  console.log(1)
  const gameOverScreen = document.querySelector('.gameOverScreen')
  const startScreen = document.querySelector('.startScreen')
  const leaderboardScreen = document.querySelector('.leaderboardScreen')

  displayScore()

  gameOverScreen.style.display = 'none'
  startScreen.style.display = 'none'
  leaderboardScreen.style.display = 'block'

  function displayScore() {

    let scores = []
    const scoresList = document.querySelector('ol')
    const addScoreButton = document.querySelector('#addScoreButton')

    // localStorage.clear()

    if (localStorage) {
      const players = JSON.parse(localStorage.getItem('players'))
      if (players) {
        scores = players
        renderList(scores, scoresList)
      }
    }

    addScoreButton.addEventListener('click', () => {
      const newName = prompt('Enter player name')
      const player = { name: newName, playerScore: score }
      console.log(scores)
      // scoreEligibilityCheck(scores)
      if (score > scores[19].playerScore) {
        console.log('yes')
        scores.pop()
        scores.push(player)
        audioDubDub.play()
      }
      renderList(scores, scoresList)

      if (localStorage) {
        localStorage.setItem('players', JSON.stringify(scores))
      }
    })
  }

  // function scoreEligibilityCheck(scores) {
  //   if (score <= scores[scores.length - 1].score) {
  //     console.log('yes')
  //     return true
  //   }
  // }

  function renderList(scores, scoresList) {
    const array = scores.sort((playerA, playerB) => playerB.playerScore - playerA.playerScore).map(player => {
      return `<li>
        ${player.name} has <strong>${player.playerScore}</strong> schmeckles.
      </li>`
    })
    scoresList.innerHTML = array.join('')

    // for (let i = 0; i < scores.length; i++) {
    //   console.log('testyouvefailed')
    // if (score <= scores.score) {
    //   alert('You\'ve failed to make the board')
    //   console.log('test7')
    // } else if (scores.length > 19) {
    //   scores.pop()
    // }
  }
}




window.addEventListener('DOMContentLoaded', setUpGame)