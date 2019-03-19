const _ = {
    map: function (arr, callback) {
        //code here;
        for (let i = 0; i < arr.length; i++) {
            arr[i] = callback(arr[i]);
        }
    },
    reduce: function (arr, callback, memo) {
        // code here;
        let element = 0;
        if (!memo) {
            memo = arr[element]
            element = 1
        }
        for (let i = element; i < arr.length; i++) {
            memo = callback(arr[i], memo)
        }
        return memo;

    },
    find: function (arr, callback) {
        // code here;
        for (let i = 0; i < arr.length; i++) {
            if (callback(arr[i])) {
                return arr[i];
            }
        }
    },
    filter: function (arr, callback) {
        // code here;
        const tempArray = [];
        for (let i = 0; i < arr.length; i++) {
            if (callback(arr[i])) {
                tempArray.push(arr[i]);
            }
        }
        return tempArray;
    },
    reject: function (arr, callback) {
        // code here;
        const tempArray = [];
        for (let i = 0; i < arr.length; i++) {
            if (!callback(arr[i])) {
                tempArray.push(arr[i]);
            }
        }
        return tempArray;

    }
}
// you just created a library with 5 methods!
const array = [1, 2, 3, 4, 5, 6];
// _.map(array, function callback(x) { return x * 2 });
// console.log(array);
console.log(_.reduce(array, function callback(x, memo) { return x + memo }));
console.log(_.find(array, function callback(x) { return x % 2 == 0; }));
console.log(_.filter(array, function (x) { return x > 3; }));
console.log(_.reject(array, function (x) { return x > 3; }));