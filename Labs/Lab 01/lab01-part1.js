// Beckham Carver
// Last Edited: 8/24/2022
// Lab 01
// COSC 3020, Lars Karthoff


//generates an array of random number, using array size and value range
function generateArray(size, range) {

    // prevents invalid size
    if (size <= 3 || range <= 0) {
        console.log("Invalid size/range, using empty array")
        return [];
    }

    var rand_array = new Array(size);
    for (var i = 0; i <= size - 2; i++) {
        rand_array[i] = Math.floor(Math.random() * range);
    }

    // guaruntees at least one duplicate entry
    rand_array[size - 1] = rand_array[1];
    return rand_array;
}

// given insertion sort algorithym
function insertionSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var val = arr[i];
        var j;
        for (j = i; j > 0 && arr[j - 1] > val; j--) {
            arr[j] = arr[j - 1];
        }``
        arr[j] = val;
        console.log(arr);
    }
}

// created reverse insertion sort algorithym, modified from given code
function reverseInsertSort(arr) {
    for (var i = arr.length-2; i >= 0; i--) {
        var val = arr[i];
        var j;
        for(j = i; j < arr.length && arr[j + 1] < val; j++) {
            arr[j] = arr[j + 1];
        }
        arr[j] = val;
    }
}

// checks if sorted, modified from given insertion code
function isSorted(arr) {
    if (arr.length > 0) {
        for (var i = 1; i < arr.length; i++) {
            var val = arr[i];
            var j;
            if (i > 0 && arr[i - 1] > val) {
                return false;
            }
        }
        return true;
    }
    return false;

}

// main testing program
function programMain() {
    
    // generates a random array, with a size and value range
    gen_arr = generateArray(50, 99);

    // clones the generated array, to leave unmodified
    ins_arr = gen_arr.map((x) => x);
    console.log("Generated array is: " , ins_arr);
    console.log("IsSorted: " , isSorted(ins_arr));

    insertionSort(ins_arr);
    console.log("Insertion sorted array is: " , ins_arr);
    console.log("IsSorted: " , isSorted(ins_arr) , "\n");


    // clones the generated array, to leave unmodified
    rev_arr = gen_arr.map((x) => x);
    console.log("Generated array is: " , rev_arr);
    console.log("IsSorted: " , isSorted(rev_arr));

    reverseInsertSort(rev_arr);
    console.log("Reverse sorted array is: " , rev_arr);
    console.log("IsSorted: " , isSorted(rev_arr) , "\n");

}

// runs test
programMain();