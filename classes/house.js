export class House {
    #availableOptions
    #choice
    constructor({ houseChoiceEl }) {
        this.#availableOptions = ["rock", "paper", "scissors"]
        this.#choice = null
        this.hasWon = false
        this.houseChoiceEl = houseChoiceEl
    }

    toggleProcessingAnimation() {
        if (this.houseChoiceEl.classList.contains("processing")) {
            this.houseChoiceEl.classList.remove("processing")
        } else {
            this.houseChoiceEl.classList.add("processing")
        }
    }

    makeChoice() {
        const choicePromise = new Promise((resolve, reject) => {
            setTimeout(() => {

                const choiceIdx = Math.floor(Math.random() * this.#availableOptions.length)
                this.#choice = this.#availableOptions[choiceIdx]

                this.houseChoiceEl.classList.add(`${this.#choice}`)
                const choiceImage = this.houseChoiceEl.querySelector("img")
                choiceImage.src = `./images/icon-${this.#choice}.svg`

                this.toggleProcessingAnimation()

                resolve(true)
            }, 4000)
        })

        return choicePromise
    }

    getChoice() {
        return this.#choice
    }

    loose() {
        this.hasWon = false
    }

    won() {
        this.hasWon = true
        this.houseChoiceEl.classList.add("winner")
    }

    reset() {
        this.hasWon = false
        this.houseChoiceEl.classList.remove(`${this.#choice}`)
        const choiceImage = this.houseChoiceEl.querySelector("img")
        choiceImage.src = ""
        this.#choice = null
        this.toggleProcessingAnimation()

        if (this.houseChoiceEl.classList.contains("winner")) {
            this.houseChoiceEl.classList.remove("winner")
        }
    }

}