export class Player {
    #choice
    #score
    constructor({ playerContainer, playerChoiceEl }) {
        this.#score = this.#initScore()
        this.#choice = null
        this.hasWon = false
        this.playerChoiceEl = playerChoiceEl
        this.playerContainer = playerContainer
    }

    #initScore() {
        return JSON.parse(localStorage.getItem("playerScore")) || 0
    }

    getScore() {
        return this.#score
    }

    setScore() {

        if (!this.hasWon && this.#score > 0) {
            this.#score -= 1
        }
        else if (this.hasWon) {
            this.#score += 1
        }

        localStorage.setItem("playerScore", JSON.stringify(this.#score))
    }

    #toggleChoices() {
        if (this.playerContainer.classList.contains("hidden")) {
            this.playerContainer.classList.remove("hidden")
        } else {
            this.playerContainer.classList.add("hidden")
        }
    }

    setChoice(input) {
        this.#choice = input.toLowerCase()
        this.playerChoiceEl.classList.add(`${this.#choice}`)
        const choiceImg = this.playerChoiceEl.querySelector("img")
        choiceImg.src = `./images/icon-${this.#choice}.svg`
        this.#toggleChoices()
    }

    getChoice() {
        return this.#choice
    }

    won() {
        this.hasWon = true
        this.setScore()
        this.playerChoiceEl.classList.add("winner")
    }

    loose() {
        this.hasWon = false
        this.setScore()
    }

    reset() {
        this.hasWon = false
        this.#toggleChoices()
        this.playerChoiceEl.classList.remove(`${this.#choice}`)
        this.playerChoiceEl.querySelector("img").src = ""
        this.#choice = null
        if (this.playerChoiceEl.classList.contains("winner")) {
            this.playerChoiceEl.classList.remove("winner")
        }
    }

}