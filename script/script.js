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

// modelo para cada carta carta, que deve ter o icone.  ICON
// precisa saber se a carta está virada ou não. FLIPPED
// diferenciar uma carta da outra, mesmo que sejam iguais, devem ter ids diferentes ID

//Função criar cartas por tecnologia.
function createCardsFromTechs(techs) {
    let cards = [];

    for (let tech of techs) {
        cards.push(createPairFromTech(tech))
    }
    return(cards.flatMap(pair => pair))  
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

function createIdWithTech(tech){
    return tech + parseInt(Math.random()*1000)
}
