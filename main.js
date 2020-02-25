function setUpGame() {
  // dom selection now work in here

  loadGrid()
  moveMorty()
  moveCarsRight()
  moveCarsLeft()
  timer()

  // reset()


}

let morty = 10
const carsArrayLeft = [20, 29, 38, 45, 57, 62, 70, 77, 89, 99, 105, 114, 124, 133, 139, 146, 150, 155, 160, 167, 171, 174, 187, 195]
const carsArrayRight = [200, 208, 217, 222, 235, 245, 255, 260, 270, 278, 288, 296, 300, 309, 315, 325, 330, 340, 346, 354, 361, 370, 376]
const dragonBallsArray = [30, 46, 56, 60, 69, 80, 90, 97, 103, 111, 120, 129, 140, 149, 156, 165, 170, 180, 188, 199, 210, 221, 233, 249, 261, 272, 280, 289, 295, 310, 316, 326, 335, 343, 355, 362, 372]
const width = 20
const gridCellCount = width * width
const cells = []
let carIntervalId
let lives = 3
let score = 0
let count = 30
let carRightIntervalId
let carLeftIntervalId
let mortyDiesIntervalId
let gameFinished = false


function loadGrid() {

  const grid = document.querySelector('.grid')
  const gameOverScreen = document.querySelector('.gameOverScreen')

  gameOverScreen.style.display = 'none'

  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === morty) {
      cell.classList.add('morty')
    }
    if (dragonBallsArray.includes(i)) {
      console.log(i)
      cell.classList.add('dragonBalls')
    }

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
}

function mortyDies() {

  const livesCounter = document.querySelector('#livesCounter')
  const mrMeeseeksSpeachBox = document.querySelector('.mrMeeseeksSpeachBox')

  for (let i = 0; i < 399; i++) {
    if (carsArrayLeft.includes(morty) || carsArrayRight.includes(morty)) {
      console.log('hit')
      cells[morty].classList.remove('morty')
      morty = 10
      cells[morty].classList.add('morty')
      livesCounter.innerHTML = `Lives: ${lives -= 1}`
      mrMeeseeksSpeachBox.innerHTML = '"Existance is PAIN Morty!"'
      gameOver()
      document.getElementById('livesCounter').style.backgroundColor = 'rgba(200, 0, 0, 0.5)'
    }
  }
}

function moveMorty() {
  if (gameFinished === true) {
    return
  } else {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        if (morty === cells.length - 1) {
          return
        }
        cells[morty].classList.remove('morty')
        morty += 1
        cells[morty].classList.add('morty')
      } else if (event.key === 'ArrowLeft') {
        if (morty === 0) {
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
      dragonBalls()
    })
  }

}

function timer() {

  const timeCounter = document.querySelector('#timeCounter')
  const mrMeeseeksSpeachBox = document.querySelector('.mrMeeseeksSpeachBox')

  let timer = setInterval(function () {
    console.log(count)
    // Minus 1 from count each second(1000)
    count--
    timeCounter.innerHTML = `Time: ${count} seconds`
    if (count <= 5) {
      document.getElementById('timeCounter').style.backgroundColor = 'rgba(200, 0, 0, 0.5)'
    }
    if (count === 0) {
      // If count = 0, call gameover and stopInterval functions
      stopInterval()
      gameOver()
      mrMeeseeksSpeachBox.innerHTML = '"Time\'s up Morty"'
    }
    if (lives === 0) {
      stopInterval()
    }
  }, 1000)

  let stopInterval = function () {
    console.log('time is up!')

    clearInterval(timer)
  }
}


function gameOver() {

  const grid = document.querySelector('.grid')
  const gameOverScreen = document.querySelector('.gameOverScreen')

  if (lives === 0 || count === 0) {
    gameFinished = true
    clearInterval(carRightIntervalId)
    clearInterval(carLeftIntervalId)
    clearInterval(mortyDiesIntervalId)
    grid.remove('grid')
    // for (let i = 0; i < 399; i++) {
    //   cells[i].classList.remove('carRight')
    //   cells[i].classList.remove('carLeft')
    //   cells[i].classList.remove('morty')
    //   cells[i].classList.remove('dragonBalls')
    // }
    // loadGameOverScreen()
    gameOverScreen.style.display = 'block'
  }
}

// function loadGameOverScreen() {

//   const gameOverScreen = document.querySelector('.gameOverScreen')
//   gameOverScreen.classList.add('.gameOverScreen')

// }

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
      scoreCounter.innerHTML = `Score: ${score += 10}`
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
  }
}

console.log('hello')

mortyDiesIntervalId = setInterval(() => {
  mortyDies()
}, 1)

// const resetButton = document.querySelector('.reset')

// document.getElementById('reset').addEventListener('click', function() {
//   lives = 3
// })





window.addEventListener('DOMContentLoaded', setUpGame)