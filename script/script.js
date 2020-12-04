const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"

let techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'
]

let cards = null;

//Função que inicia o jogo acionando a criação das cartas e embaralhamento.

startGame();

function startGame() {
    cards = createCardsFromTechs(techs)
    shuffleCards(cards)

    initializeCards(cards)

}

function initializeCards(cards){
    let gameBoard = document.getElementById("gameBoard")
    
    cards.forEach(card =>{
        let cardElement = document.createElement('div');
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click',flipCard)
        gameBoard.appendChild(cardElement)
    })

}




function createCardContent(card, cardElement){
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}


function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if(face == FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./imagens/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = '&lt/&gt'
    }

    element.appendChild(cardElementFace)
}



//Função para embaralhamento das cartas, contendo a lógica
//selecionando a ultima carta o index dela, e trocando por outra carta aleatória.

function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    }
}

// modelo para cada carta carta, que deve ter o icone.  ICON
// precisa saber se a carta está virada ou não. FLIPPED
// diferenciar uma carta da outra, mesmo que sejam iguais, devem ter ids diferentes ID

//Função criar cartas por tecnologia.
function createCardsFromTechs(techs) {
    let cards = [];

    techs.forEach((tech) => {
        cards.push(createPairFromTech(tech))
    })
    return cards.flatMap(pair => pair)
}


//Função que vai retornar o array com o par de 2 objetos contendo...
// ID(RANDOMICO), ICON(tecnologia que o objeto representa) E FLIPPED(Começa sempre false)


function createPairFromTech(tech) {
    return [{
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false,
    },

    {
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false,
    }]
}

//Função responsável por criar um ID randomico, concatenando o nome da tecnologia
//Com um número aleatório inteiro entre 0 e 1 mil

function createIdWithTech(tech) {
    return tech + parseInt(Math.random() * 1000)
}

function flipCard(){
    this.classList.add("flip")
}