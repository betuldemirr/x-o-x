import React from "react";
import "./game.css"

const X_CLASS = 'x'
const O_CLASS = 'o'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')
let turn

startGame()
restartButton.addEventListener('click', startGame);

//start
function startGame() {
    turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
}
//handle click
function handleClick(e) {
    const cell = e.target
    const currentClass = turn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}
//end
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${turn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}
//check for draw
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}
//placeMark
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
//switch turns
function swapTurns() {
    turn = !turn
}
//set board hover
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)
    if (turn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}
//check for win
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

const Game = () => {
    return (
        <div className="gameContainer">
            <div className="board" id="board">
                <div className="cell" data-cell></div>
                <div className="cell" data-cell></div>
                <div className="cell" data-cell></div>
                <div className="cell" data-cell></div>
                <div className="cell" data-cell></div>
                <div className="cell" data-cell></div>
                <div className="cell" data-cell></div>
                <div className="cell" data-cell></div>
                <div className="cell" data-cell></div>
            </div>
            <div className="winning-message" id="winningMessage">
                <div data-winning-message-text></div>
                <button className="button" id="restartButton">Restart</button>
            </div>
        </div>
    )
}
export default Game;