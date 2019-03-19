function Ninja(name, health = 100) {
    var speed = 3;
    var strength = 3;
    this.name = name;
    this.health = health;
    this.showStats = function () {
        console.log("Name: " + this.name + ", Health: " + this.health + ", Speed: " + speed + ", Strength: " + strength);
        return this;
    }
}
Ninja.prototype.sayName = function () {
    console.log("My ninja name is " + this.name)
    return this;
}
Ninja.prototype.drinkSake = function () {
    this.health += 10;
    return this;
}
Ninja.prototype.punch = function (ninja) {
    ninja.health -= 5;
    console.log(ninja.name + " was punched by " + this.name + " and lost 5 health!");
    return this;
}
Ninja.prototype.kick = function (ninja) {
    ninja.health -= 15;
    console.log(ninja.name + " was kicked by " + this.name + " and lost 15 health!");
    return this;
}

var blueNinja = new Ninja("Goemon");
var redNinja = new Ninja("Bill Gates");
redNinja.punch(blueNinja);
blueNinja.kick(redNinja);