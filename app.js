import { Player } from "./classes/player.js"
import { House } from "./classes/house.js"

const elements = {
    playerElements: {
        playerInput: document.querySelectorAll(".user-input"),
        playerContainer: document.querySelector("#options-container"),
        playerChoiceEl: document.querySelector("#user-choice")
    },
    houseElements: {
        houseChoiceEl: document.querySelector("#house-choice")
    },
    globalElements: {
        scoreEl: document.querySelector("#score"),
        resultContainer: document.querySelector("#winner-container"),
        resultStatus: document.querySelector("#result-status"),
        resultEl: document.querySelector("#result"),
        playAgain: document.querySelector("#play-again")
    }
}

const player = new Player(elements.playerElements)
const house = new House(elements.houseElements)


function init() {
    const playerScore = player.getScore()
    elements.globalElements.scoreEl.textContent = playerScore
}


function reset() {
    init()
    elements.globalElements.resultStatus.classList.add("hidden")
    elements.globalElements.resultContainer.classList.add("hidden")
    player.reset()
    house.reset()
}


function showResults() {

    const playerScore = player.getScore()

    elements.globalElements.scoreEl.textContent = playerScore
    elements.globalElements.resultStatus.classList.remove("hidden")

    if (player.hasWon) {
        elements.globalElements.resultEl.textContent = "You Won"
        console.log("player")
    } 
    else if (house.hasWon) {
        elements.globalElements.resultEl.textContent = "House Won"
    } 
    else {
        elements.globalElements.resultEl.textContent = "Tie"
    }
}


function determineWinner() {
    const playerChoice = player.getChoice()
    const houseChoice = house.getChoice()

    if (
        (playerChoice == "rock" && houseChoice == "scissors") ||
        (playerChoice == "scissors" && houseChoice == "paper") ||
        (playerChoice == "paper" && houseChoice == "rock")
    ) {
        player.won()
    }
    else if (
        (houseChoice == "rock" && playerChoice == "scissors") ||
        (houseChoice == "scissors" && playerChoice == "paper") ||
        (houseChoice == "paper" && playerChoice == "rock")
    ) {
        house.won()
        player.loose()
    }
}


async function handlePlayers() {
    const hasHouseMadeChoice = await house.makeChoice()

    if (hasHouseMadeChoice) {
        determineWinner()
        showResults()
    }
}



function handlePlayerChoice(e) {
    const { choice: playerChoice } = e.currentTarget.dataset
    player.setChoice(playerChoice)
    elements.globalElements.resultContainer.classList.remove("hidden")
    handlePlayers()
}


elements.playerElements.playerInput.forEach((playerChoice) => {
    playerChoice.addEventListener("click", handlePlayerChoice)
})


elements.globalElements.playAgain.addEventListener("click", reset)
init()