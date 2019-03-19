class Card {
    constructor(suit, stringVal, numericalVal) {
        this.suit = suit;
        this.stringVal = stringVal;
        this.numericalVal = numericalVal;
    }
    //prototype method
    show() {
        console.log(`A card is shown, revealing it is a ${this.stringVal} ${this.suit}`);
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }
    reset() {
        const suits = ['Clubs', 'Hearts', 'Diamonds', 'Spades'];
        const values = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queens", "King"];

        for (const i of suits) {
            for (const j of values) {
                this.cards.push(`${j} of ${i}`);
            }
        }

        return this;
    }
    shuffle() {
        for (let i = 0; i < this.cards.length; i++) {
            let temp = this.cards[i];
            let randNumber = Math.floor(Math.random() * this.cards.length);
            this.cards[i] = this.cards[randNumber];
            this.cards[randNumber] = temp
        }
        return this.cards;
    }

    deal() {
        return this.cards.pop();
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
    }

    draw(deck) {
        this.hand.push(deck.deal());
        return this;
    }

    discard() {
        this.hand.pop();
        return this;
    }
}

const deck2 = new Deck();
deck2.reset().shuffle();
console.log(deck2);
const player2 = new Player("kakada");
player2.draw(deck2);
console.log(player2);
console.log(deck2);