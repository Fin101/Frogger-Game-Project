function setUpGame() {
  // dom selection now work in here

  loadGrid()
  moveMorty()
  loadGrass()
  loadRoad()
  loadWater()
  loadCar()
  moveCars()

}

let morty = 390
const carsArray = [361, 366, 370, 376]
const width = 20
const gridCellCount = width * width
const cells = []
let carIntervalId

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
  for (let i = 180; i <= 199; i++) {
    cells[i].classList.add('grass')
  }
  for (let i = 0; i <= 19; i++) {
    cells[i].classList.add('grass')
  }
}

function loadRoad() {
  for (let i = 200; i <= 379; i++) {
    cells[i].classList.add('road')
  }
}

function loadWater() {
  for (let i = 20; i <= 179; i++) {
    cells[i].classList.add('water')
  }
}

function loadCar() {
  for (let i = 361; i < 377; i++) {
    if (carsArray.includes(i)) {
      cells[i].classList.add('car')
    }
  }
}

function moveCars() {
  // setting interval for all the cars
  carIntervalId = setInterval(() => {
    // looping through each car
    for (let i = 0; i < carsArray.length; i++) {
      // checking if car is at the end of the row. If the remainder of carsArray[i] divided by width is equal to 19, then we know it's hit the edge of the grid.
      if (carsArray[i] % width === (width - 1)) {
        // If true, we remove class 'cars' from current cell
        cells[carsArray[i]].classList.remove('car')
        // we reassign carsArray[i] to equal carsArray[i] - width (beginning of row)
        carsArray[i] = carsArray[i] - width
      }
      // currently = cell 359
      cells[carsArray[i]].classList.remove('car')

      carsArray[i]++
      // add 1 cell to equal cell 360
      cells[carsArray[i]].classList.add('car')
      // adding car to 360
    }
  }, 500)
}

window.addEventListener('DOMContentLoaded', setUpGame)