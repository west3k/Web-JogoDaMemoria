const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"


//Função que inicia o jogo acionando a criação das cartas e embaralhamento.

startGame();

function startGame() {
    initializeCards(game.createCardsFromTechs())
}

//Função responsável por criar as cartas
function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard")

    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })

}

//Função responsável por criar o content de cada carta
function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

//Função responsável por criar a parte da frente e de trás da carta
function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if (face == FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./imagens/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = '&lt/&gt'
    }

    element.appendChild(cardElementFace)
}

function flipCard() {

    if (game.setCard(this.id)) {
        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)
            }
        }
    }
}