function setUpGame() {
  // dom selection now work in here

  loadGrid()
  moveMorty()

}

let morty = 10
const width = 20
const gridCellCount = width * width
const cells = []

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
  }
}

function moveMorty() {
  document.addEventListener('keydown', (event) => {
    console.log(event.key)
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

window.addEventListener('DOMContentLoaded', setUpGame)