// Beckham Carver
// Last Edited: 9/23/2022
// Lab 02
// COSC 3020, Lars Karthoff

/*
T(n) =  | 1                 (if n <= 1)
        | 2                 (if n = 2)
        | 3T(n/3) + n       (if n > 2)

Solution:
    3T(n/3) + n
    3(3T(n/9) + n/3) + n
    9T(n/9) + 2n
    27T(n/27) + 3n
    ...
    3^i * T(n/3^i) + in
    (i = log3(n))
    ...
    nT(1) + nlog3(n) \belongs\ n log n
*/

function divSum(arr) {
    console.log("array: " , arr)
    if (arr.length <= 2) {
        var total = 0;
        for (let i=0; i < arr.length; i++) {
            total += arr[i];
        }
        return total;
    }
    if (arr.length > 2) {
        var len = arr.length;
        var third = len/3;

        // .slice takes care of out of bounds array calls
        var one = divSum(arr.slice(0,third));
        var two = divSum (arr.slice(third, 2*third));
        var three = divSum (arr.slice(2*third, len))
    
        console.log("running totals:" , one, two, three)
        return one + two + three;
    }
}

arr = [ 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1 ];

console.log("start")
console.log(divSum(arr));