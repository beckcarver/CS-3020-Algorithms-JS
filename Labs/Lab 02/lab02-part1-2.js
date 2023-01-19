// Beckham Carver
// Last Edited: 9/7/2022
// Lab 02
// COSC 3020, Lars Karthoff

// Sources: 
//  Zac Harris (in lab TA)
//  javascript documentation for array constructor

/////////////////////////////////////////////////////////////
// PART 2:                                                 //
// Their are two key invariants to the fibbonacci sequence //
//    - The first two elements are 0 and 1 respectively    //
//    - Any element of index 'i' such that i>1 is always   //
//      the sum of (i-1) + (i-2)                           //
//                                                         //
// This is because these are the properties that define    //
// recurance relation behind the fibonacci sequence. If    //
// they are broken it will no longer be 'the' fibonacci    //
// sequence.                                               //
//                                                         //
/////////////////////////////////////////////////////////////

// PART 1:
function fibonacci (arr, depth) {
    let length = arr.length;
    if (length <= depth) {
        let next = arr[length - 1] + arr[length -2];
        arr.push(next);
        fibonacci(arr, depth);
    }
    else {
        //console.log(arr);
        return arr;
    }
}

function fib (depth) {
    arr = new Array(0,1);
    fibonacci(arr, depth);
    return arr;
}

console.log(fib(7));
console.log(fib(20));
console.log(fib(3));
console.log(fib(37));