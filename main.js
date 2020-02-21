function setUpGame() {
  // dom selection now work in here

  loadGrid()
  moveMorty()
  loadGrass()
  loadRoad()
  moveCarsRight()
  moveCarsLeft()


}

let morty = 10
const carsArrayLeft = [20, 25, 29, 34, 38, 45, 51, 57, 62, 70, 73, 77, 83, 89, 99, 105, 109, 114, 120, 124, 129, 133, 139, 141, 146, 150, 155, 160, 163, 167, 171, 174, 179, 187, 190, 195]
const carsArrayRight = [200, 205, 208, 213, 217, 220, 222, 227, 235, 339, 245, 249, 255, 257, 260, 265, 270, 278, 281, 288, 291, 296, 300, 309, 315, 319, 325, 330, 333, 340, 346, 350, 354, 361, 366, 370, 376]
const width = 20
const gridCellCount = width * width
const cells = []
let carIntervalId
let lives = 3


function loadGrid() {

  const grid = document.querySelector('.grid')

  for (let i = 0; i < gridCellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    if (i === morty) {
      cell.classList.add('morty')
    }
    grid.appendChild(cell)
    cells.push(cell)
    cell.id = i
  }
}

function moveMorty() {
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
  })
}

function loadGrass() {
  for (let i = 380; i <= 399; i++) {
    cells[i].classList.add('grass')
  }
  // for (let i = 180; i <= 199; i++) {
  //   cells[i].classList.add('grass')
  // }
  for (let i = 0; i <= 19; i++) {
    cells[i].classList.add('grass')
  }
}

function loadRoad() {
  for (let i = 20; i <= 379; i++) {
    cells[i].classList.add('road')
  }
}

// function loadWater() {
//   for (let i = 20; i <= 179; i++) {
//     cells[i].classList.add('water')
//   }
// }

function loadCarLeft() {
  for (let i = 0; i < 200; i++) {
    if (carsArrayLeft.includes(i)) {
      cells[i].classList.add('carLeft')
    }
  }
}

function loadCarRight() {
  for (let i = 201; i < 379; i++) {
    if (carsArrayRight.includes(i)) {
      cells[i].classList.add('carRight')
    }
  }
}

function mortyDies() {

  const livesCounter = document.querySelector('.livesCounter')
  const mrMeeseeksSpeachBox = document.querySelector('.mrMeeseeksSpeachBox')

  for (let i = 0; i < 399; i++) {
    if (carsArrayLeft.includes(morty) || carsArrayRight.includes(morty)) {
      console.log('hit')
      cells[morty].classList.remove('morty')
      morty = 10
      cells[morty].classList.add('morty')
      livesCounter.innerHTML = `Lives: ${lives -= 1}`
      mrMeeseeksSpeachBox.innerHTML = '"Existance is PAIN Morty!"'
    }
  }
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
console.log('hello')

mortyDiesIntervalId = setInterval(() => {
  mortyDies()
}, 1)



window.addEventListener('DOMContentLoaded', setUpGame)