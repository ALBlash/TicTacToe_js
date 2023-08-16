const gameContainer = document.querySelector('.container')
const winnerMessage = document.getElementById('win-mess');
const gameBord = document.querySelector('.bord');
const createCells = ["", "", "", "", "", "", "", "", ""];
let Xturn = true;
let filledBoxesCount = 0;









// creating 9 boxes and "id" to each and adding them to the html page

function createCellsLoop() {
    createCells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('box');
        cellElement.setAttribute('id', index); // Adding an ID from 1 to 9
        gameBord.append(cellElement);
        // console.log(cellElement)
    });
}

createCellsLoop();


// adding the event listener to each box
function addEvent() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', handleBoxClick);
    });

}


addEvent()
function handleBoxClick(event) {
    const clickedBox = event.target;
    // const clickedBoxId = clicke dBox.id; // use it for the winning combination
    // console.log(clickedBox)
    if (Xturn) {
        const imageElement = document.createElement('img');
        imageElement.src = "./images/X.png";
        imageElement.classList.add("axe");
        clickedBox.appendChild(imageElement); // Append the image to the clicked box
        Xturn = false; // Update the value of Xturn
        filledBoxesCount++
        winnerMessage.innerText = "It's now O's Turn"
        winnerMessage.style.color = "white"
        clickedBox.removeEventListener('click', handleBoxClick)
        console.log(filledBoxesCount);
        checkScore();
    } else {
        const imageElement = document.createElement('img');
        imageElement.src = "./images/O.png";
        imageElement.classList.add("circle");
        clickedBox.appendChild(imageElement);
        Xturn = true;
        filledBoxesCount++
        winnerMessage.innerText = "It's now X's Turn"
        winnerMessage.style.color = "rgb(231 203 203)"
        clickedBox.removeEventListener('click', handleBoxClick)
        console.log(filledBoxesCount);
    }
    checkScore();
};


// working
const restart = document.getElementById('Restart-btn');
restart.addEventListener('click', () => {

    const img = document.querySelectorAll(".box img")
    img.forEach(img => img.remove());

    winnerMessage.innerText = "First player will be X"
    winnerMessage.style.color = "rgb(231 203 203)"
    filledBoxesCount = 0;
    Xturn = true;

    addEvent();
});





function checkScore() {
    const allBoxes = document.querySelectorAll(".box");
    let winFound = false; // Flag to track if a win condition is found

    const winCombination = [
        /*rows*/
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        /*columns*/
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        /*sideways*/
        [0, 4, 8],
        [2, 4, 6]
    ];

    winCombination.forEach(array => {
        const oWins = array.every(cell =>
            allBoxes[cell].firstChild?.classList.contains('circle'));

        if (oWins) {
            winnerMessage.innerHTML = "O Wins!!!";
            winFound = true; // Set the flag to true
            allBoxes.forEach(box => box.replaceWith(box.cloneNode(true)));
            return;
        }
    });

    if (!winFound) { // If no win condition is found
        winCombination.forEach(array => {
            const xWins = array.every(cell =>
                allBoxes[cell].firstChild?.classList.contains('axe'));

            if (xWins) {
                winnerMessage.innerHTML = "X Wins!!!";
                winFound = true; // Set the flag to true
                allBoxes.forEach(box => box.replaceWith(box.cloneNode(true)));
                return;
            }
        });
    }

    if (!winFound && filledBoxesCount === 9) {
        winnerMessage.innerHTML = "Tie!";
    }
}
