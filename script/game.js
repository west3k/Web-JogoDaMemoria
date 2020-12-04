let game = {
    techs: [
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
    ],

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard: function(id){
       let card = this.cards.filter(card => card.id === id)[0]
       console.log(card)
        if(card.flipped || this.lockMode){
            return false
        }
        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true
            return true
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return(this.firstCard.icon === this.secondCard.icon)
    },

    clearCards: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },

    unflipCards: function(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },

    checkGameOver: function(){
       return this.cards.filter(card => !card.flipped).length == 0;
    },

    cards: null,

    // modelo para cada carta carta, que deve ter o icone.  ICON
    // precisa saber se a carta está virada ou não. FLIPPED
    // diferenciar uma carta da outra, mesmo que sejam iguais, devem ter ids diferentes ID

    //Função criar cartas por tecnologia.
    createCardsFromTechs: function () {
        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech))
        })
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards();
        return this.cards
    },


    //Função que vai retornar o array com o par de 2 objetos contendo...
    // ID(RANDOMICO), ICON(tecnologia que o objeto representa) E FLIPPED(Começa sempre false)


    createPairFromTech: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        },

        {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]
    },

    //Função responsável por criar um ID randomico, concatenando o nome da tecnologia
    //Com um número aleatório inteiro entre 0 e 1 mil

    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000)
    },

    //Função para embaralhamento das cartas, contendo a lógica
    //selecionando a ultima carta o index dela, e trocando por outra carta aleatória.

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }

}