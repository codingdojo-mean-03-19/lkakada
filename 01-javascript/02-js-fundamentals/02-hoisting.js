console.log(hello);
var hello = 'world';
//Prediction: undefined
//Output: undefined

var needle = 'haystack';
test();
function test() {
    var needle = 'magnet';
    console.log(needle);
}
//Predition: magnet
//Output: magnet

var brendan = 'super cool';
function print() {
    brendan = 'only okay';
    console.log(brendan);
}
console.log(brendan);
//Predition: super cool
//Output: super cool

var food = 'chicken';
console.log(food);
eat();
function eat() {
    food = 'half-chicken';
    console.log(food);
    var food = 'gone';
}
//Predition: chicken, half-chicken
//Output: chicken, half-chicken

mean();
console.log(food);
var mean = function () {
    food = "chicken";
    console.log(food);
    var food = "fish";
    console.log(food);
}
console.log(food);
//Predition: TypeError: mean is not defined
//Output: TypeError: mean is not defined

console.log(genre);
var genre = "disco";
rewind();
function rewind() {
    genre = "rock";
    console.log(genre);
    var genre = "r&b";
    console.log(genre);
}
console.log(genre);
//Predition: undefined, rock, r&b, disco
//Output: undefined, rock, r&b, disco

dojo = "san jose";
console.log(dojo);
learn();
function learn() {
    dojo = "seattle";
    console.log(dojo);
    var dojo = "burbank";
    console.log(dojo);
}
console.log(dojo);
//Predition: san jose, seattle, burbank, san jose
//Output: san jose, seattle, burbank, san jose

console.log(makeDojo("Chicago", 65));
console.log(makeDojo("Berkeley", 0));
function makeDojo(name, students) {
    const dojo = {};
    dojo.name = name;
    dojo.students = students;
    if (dojo.students > 50) {
        dojo.hiring = true;
    }
    else if (dojo.students <= 0) {
        dojo = "closed for now";
    }
    return dojo;
}
//Predition: compile fail
//Output: compile fail