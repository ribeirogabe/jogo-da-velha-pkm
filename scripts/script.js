const cellEllements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winnerTextElement = document.querySelector("[data-win-message-text]");
const winnerText = document.querySelector("[data-win-message]");
const restartButton = document.querySelector("[data-restart-button]");
const startButton = document.querySelector("[data-start-button]");
const startText = document.querySelector("[data-start-message]");
const screenLoad = document.querySelector("[data-screen-load]");

let isCircleTurn = false;

const winningCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [2,4,6],
    [0,4,8],
];


const screenLoadAnimation = () => {
    screenLoad.style.animation = "screenChangeColor 3s linear 0s 1 normal forwards running";
};

const startBattle =() =>{
        startText.classList.add("hidden_start_message"); 
};

const startGame = () =>{
    isCircleTurn=false;

    for(const cell of cellEllements){
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    };

    setBoardHandleClass();
    winnerText.classList.remove("show_win_message")
};

const endGame = (isDraw) =>{

    if(isDraw){
        winnerTextElement.innerHTML= 'DEU EMPATE!'
    } else{
        winnerTextElement.innerText = isCircleTurn 
        ?"PLUSLE VENCEU!" 
        :"MINUN VENCEU!";
    }

     winnerText.classList.add("show_win_message");
};

const checkForWin = (currentPlayer) =>{

    let score = document.getElementsByClassName("score");

    return winningCombination.some((combination) =>{
        return combination.every((index) => {
            return cellEllements[index].classList.contains(currentPlayer);
        })
    })
};

const checkForDraw = () =>{
    return [...cellEllements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) =>{
    cell.classList.add(classToAdd);
};

const setBoardHandleClass = () =>{
    board.classList.remove("circle");
    board.classList.remove("x");

    if(isCircleTurn) {
        board.classList.add("circle")
    } else{
        board.classList.add("x")
    }
}

const swapTurns = () =>{
    isCircleTurn = !isCircleTurn;

    setBoardHandleClass();
};

const handleClick = (e) => {

    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);


    const isWin = checkForWin(classToAdd);

    const isDraw = checkForDraw();
    if(isWin) {
        endGame(false);
    } else if (isDraw){
        endGame(true)
    } else {
        swapTurns();
    }
};

for(const cell of cellEllements){
    cell.addEventListener('click', handleClick, {once:true});
};

const scorePlayer = () =>{

};

startGame();



startButton.addEventListener('click', screenLoadAnimation);

startButton.addEventListener('click', startBattle);

restartButton.addEventListener('click', startGame);



