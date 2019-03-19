function fib() {
    // Some variables here
    let a = 1, b = 0, temp;
    function nacci() {
        // do something to those variables here
        temp = a;
        a = a + b;
        b = temp;
        console.log(b);
    }
    return nacci
}
var fibCounter = fib();
fibCounter() // should console.log "1"
fibCounter() // should console.log "1"
fibCounter() // should console.log "2"
fibCounter() // should console.log "3"
fibCounter() // should console.log "5"
fibCounter() // should console.log "8"
