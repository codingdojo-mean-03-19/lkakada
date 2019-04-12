class Bike {
    constructor(public price: number, public max_speed: string, public mile: number = 0) {
    }
    displayInfo() {
        if (this.mile < 0) {
            this.mile = 0;
        }
        console.log(`The bike price is ${this.price}, its max speed ${this.max_speed} and total miles ${this.mile}`);
        return this;
    }
    ride() {
        console.log("Riding");
        this.mile += 10;
        return this;
    }
    reverse() {
        console.log("Reversing");
        this.mile -= 5;
        return this;
    }
}

let b1 = new Bike(200, "25mph");
b1.ride().ride().ride().reverse().displayInfo();
let b2 = new Bike(200, "25mph");
b2.ride().ride().reverse().reverse().displayInfo();
let b3 = new Bike(200, "25mph");
b3.reverse().reverse().reverse().displayInfo();