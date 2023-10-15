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

// switch between "x" & "o"
function handleBoxClick(event) {
    const clickedBox = event.target;

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
        console.log(`full boxes ${filledBoxesCount}`);
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
        console.log(`full boxes ${filledBoxesCount}`);
    }
    checkScore();
    return;
};



// working
const restart = document.getElementById('Restart-btn');
restart.addEventListener('click', () => {

    const img = document.querySelectorAll(".box img")
    img.forEach(img => img.remove());
    winnerMessage.innerText = "First player will be X"
    winnerMessage.style.color = "rgb(231 203 203)";
    winnerMessage.style.backgroundColor = ""
    Xturn = true;
    filledBoxesCount = 0;
    console.clear()

    addEvent();
});





function checkScore() {
    const allBoxes = document.querySelectorAll(".box");
    let winFound = false; //track if a win condition is found

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


    // on each array we run the "every" function 
    // and we check if the first child of each cell containes class
    //circle
    winCombination.forEach(array => {
        const oWins = array.every(cell =>
            allBoxes[cell].firstChild?.classList.contains('circle'));

        if (oWins) {
            winnerMessage.innerHTML = "O Wins!!!";
            winnerMessage.style.backgroundColor = "#3b9b3bba";
            winnerMessage.style.borderRadius = "8px";

            winFound = true; // Set the flag to true


            //replacing each cell with a fresh clone of itself
            //effectively resetting the game board for a new round without reloading the entire page.
            allBoxes.forEach(box => box.replaceWith(box.cloneNode(true)));


            const scorePlayerO = document.getElementById('score-O');
            let currentScore = parseInt(scorePlayerO.innerText)
            currentScore++;
            scorePlayerO.innerText = currentScore;

            return;
        }
    });

    if (!winFound) { // If no win condition is found
        winCombination.forEach(array => {
            const xWins = array.every(cell =>
                allBoxes[cell].firstChild?.classList.contains('axe'));

            if (xWins) {
                winnerMessage.innerHTML = "X Wins!!!";
                winnerMessage.style.backgroundColor = "#3b9b3bba";
                winnerMessage.style.borderRadius = "8px";


                winFound = true; // Set the flag to true

                allBoxes.forEach(box => box.replaceWith(box.cloneNode(true)));
                const scorePlayerX = document.getElementById('score-X');
                let currentScore = parseInt(scorePlayerX.innerText)
                currentScore++;
                scorePlayerX.innerText = currentScore;
                return;
            }
        });
    }

    if (!winFound && filledBoxesCount === 9) {
        winnerMessage.innerHTML = "Tie!";
        winnerMessage.style.backgroundColor = '#808080bf';
        winnerMessage.style.fontFamily = 'auto';
        winnerMessage.style.borderRadius = "8px";
    }
}

