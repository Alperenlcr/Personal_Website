
document.addEventListener('DOMContentLoaded', () => {
const grid = document.querySelector('.grid')
const scoreDisplay_journey = document.getElementById('score_journey')
const scoreDisplay_cv = document.getElementById('score_cv')
const scoreDisplay_projects = document.getElementById('score_projects')
const scoreDisplay_contact = document.getElementById('score_contact')
const bar_journey = document.getElementById("bar_journey");
const bar_cv = document.getElementById("bar_cv");
const bar_projects = document.getElementById("bar_projects");
const bar_contact = document.getElementById("bar_contact");
const btn_journey = document.getElementById("btn_journey");
const btn_cv = document.getElementById("btn_cv");
const btn_projects = document.getElementById("btn_projects");
const btn_contact = document.getElementById("btn_contact");
const width = 8
const squares = []
let score_journey = 0
let score_cv = 0
let score_projects = 0
let score_contact = 0
let showButton = document.getElementById("showButton");
showButton.addEventListener("click", () => {
  bar_journey.style.width = `${width}%`;
  bar_journey.classList.add("hidden");
  btn_journey.classList.remove("hidden");
  bar_cv.style.width = `${width}%`;
  bar_cv.classList.add("hidden");
  btn_cv.classList.remove("hidden");
  bar_projects.style.width = `${width}%`;
  bar_projects.classList.add("hidden");
  btn_projects.classList.remove("hidden");
  bar_contact.style.width = `${width}%`;
  bar_contact.classList.add("hidden");
  btn_contact.classList.remove("hidden");
});
const candyColors = [
  'url(static/images/yellow-candy1.png)',
  'url(static/images/projects2.png)',
    'url(static/images/orange-candy3.png)',
    'url(static/images/purple-candy4.png)',
    'url(static/images/green-candy5.png)',
    'url(static/images/blue-candy6.png)'
  ]



  
function fillBar(param, bar, btn) {

  let width = 0;
  if (param >= 10) {
    width = 100;
    bar.style.width = `${width}%`;
    bar.classList.add("hidden");
    btn.classList.remove("hidden");
  } else {
    width = param * 10;
    bar.style.width = `${width}%`;
  }
}

//create your board
function createBoard() {
  for (let i = 0; i < width*width; i++) {
    const square = document.createElement('div')
    square.setAttribute('draggable', true)
    square.setAttribute('id', i)
    square.style.width ='min(7vw, 10vh)'
    square.style.height ='min(7.22vw, 10vh)'
    let randomColor = Math.floor(Math.random() * candyColors.length)
    square.style.backgroundImage = candyColors[randomColor]
    grid.appendChild(square)
    squares.push(square)
  }
}
createBoard()

// Dragging the Candy
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('drageleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart(){
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    // this.style.backgroundImage = ''
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {
    this.style.backgroundImage = ''
}

function dragDrop() {
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
}

function dragEnd() {
    //What is a valid move?
    let validMoves = [squareIdBeingDragged -1 , squareIdBeingDragged -width, squareIdBeingDragged +1, squareIdBeingDragged +width]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    }  else if (squareIdBeingReplaced && !validMove) {
       squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
       squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
    } else  squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}

//drop candies once some have been cleared
function moveIntoSquareBelow() {
    for (i = 0; i < 55; i ++) {
        if(squares[i + width].style.backgroundImage === '') {
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && (squares[i].style.backgroundImage === '')) {
              let randomColor = Math.floor(Math.random() * candyColors.length)
              squares[i].style.backgroundImage = candyColors[randomColor]
            }
        }
    }
}


///Checking for Matches
//for row of Four
  function checkRowForFour() {
    for (i = 0; i < 60; i ++) {
      let rowOfFour = [i, i+1, i+2, i+3]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if (notValid.includes(i)) continue

      if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        switch (parseInt(decidedColor[decidedColor.length-7])) {
          case 1:
            score_journey += 4
            scoreDisplay_journey.innerHTML = score_journey
            fillBar(score_journey, bar_journey, btn_journey);
            break;
          case 2:
            score_projects += 4
            scoreDisplay_projects.innerHTML = score_projects
            fillBar(score_projects, bar_projects, btn_projects);
            break;
          case 3:
            score_cv += 4
            scoreDisplay_cv.innerHTML = score_cv
            fillBar(score_cv, bar_cv, btn_cv);
            break;
          case 4:
            score_contact += 4
            scoreDisplay_contact.innerHTML = score_contact
            fillBar(score_contact, bar_contact, btn_contact);
            break;
          default:
            break;
        }
        rowOfFour.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForFour()

//for column of Four
  function checkColumnForFour() {
    for (i = 0; i < 39; i ++) {
      let columnOfFour = [i, i+width, i+width*2, i+width*3]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if(columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        switch (parseInt(decidedColor[decidedColor.length-7])) {
          case 1:
            score_journey += 4
            scoreDisplay_journey.innerHTML = score_journey
            fillBar(score_journey, bar_journey, btn_journey);
            break;
          case 2:
            score_projects += 4
            scoreDisplay_projects.innerHTML = score_projects
            fillBar(score_projects, bar_projects, btn_projects);
            break;
          case 3:
            score_cv += 4
            scoreDisplay_cv.innerHTML = score_cv
            fillBar(score_cv, bar_cv, btn_cv);
            break;
          case 4:
            score_contact += 4
            scoreDisplay_contact.innerHTML = score_contact
            fillBar(score_contact, bar_contact, btn_contact);
            break;
          default:
            break;
        }
        columnOfFour.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
checkColumnForFour()

  //for row of Three
  function checkRowForThree() {
    for (i = 0; i < 61; i ++) {
      let rowOfThree = [i, i+1, i+2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if (notValid.includes(i)) continue

      if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        switch (parseInt(decidedColor[decidedColor.length-7])) {
          case 1:
            score_journey += 3
            scoreDisplay_journey.innerHTML = score_journey
            fillBar(score_journey, bar_journey, btn_journey);
            break;
          case 2:
            score_projects += 3
            scoreDisplay_projects.innerHTML = score_projects
            fillBar(score_projects, bar_projects, btn_projects);
            break;
          case 3:
            score_cv += 3
            scoreDisplay_cv.innerHTML = score_cv
            fillBar(score_cv, bar_cv, btn_cv);
            break;
          case 4:
            score_contact += 3
            scoreDisplay_contact.innerHTML = score_contact
            fillBar(score_contact, bar_contact, btn_contact);
            break;
          default:
            break;
        }
        rowOfThree.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
  checkRowForThree()

//for column of Three
  function checkColumnForThree() {
    for (i = 0; i < 47; i ++) {
      let columnOfThree = [i, i+width, i+width*2]
      let decidedColor = squares[i].style.backgroundImage
      const isBlank = squares[i].style.backgroundImage === ''

      if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
        switch (parseInt(decidedColor[decidedColor.length-7])) {
          case 1:
            score_journey += 3
            scoreDisplay_journey.innerHTML = score_journey
            fillBar(score_journey, bar_journey, btn_journey);
            break;
          case 2:
            score_projects += 3
            scoreDisplay_projects.innerHTML = score_projects
            fillBar(score_projects, bar_projects, btn_projects);
            break;
          case 3:
            score_cv += 3
            scoreDisplay_cv.innerHTML = score_cv
            fillBar(score_cv, bar_cv, btn_cv);
            break;
          case 4:
            score_contact += 3
            scoreDisplay_contact.innerHTML = score_contact
            fillBar(score_contact, bar_contact, btn_contact);
            break;
          default:
            break;
        }
        columnOfThree.forEach(index => {
        squares[index].style.backgroundImage = ''
        })
      }
    }
  }
checkColumnForThree()

// Checks carried out indefintely - Add Button to clear interval for best practise, or clear on game over/game won. If you have this indefinite check you can get rid of calling the check functions above.
window.setInterval(function(){
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    moveIntoSquareBelow()
  }, 100)
})
