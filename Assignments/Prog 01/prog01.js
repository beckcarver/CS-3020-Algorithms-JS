// Beckham Carver
// Last Edited: 1/xx/2023
// Prog 01
// COSC 3020, Lars Karthoff

// Sources:
// My code from last semester, which used geeksorgeeks.org/in-place-merge-sort/ 
// for a portion of the in-place logic, I also used my lab1 code

function msort(x, lo, arr_size) {
    if (lo >= arr_size || x == null) return;
    /*
    var mid = Math.floor((lo + arr_size) / 2);
    msort(x, lo, mid);
    msort(x, mid + 1, arr_size);
    merge(x, lo, mid, arr_size);
    */
   var select; // selection size
   var left; // left iteration variable
    for(select = 1; select < arr_size; select = select * 2) {
        for(left = 0; left < arr_size; left += select * 2) {
            var mid = left + select - 1;
            var right = left + (2 * select - 1);
            if (mid > arr_size) merge (x, left, arr_size, arr_size);
            else if (right > arr_size) merge (x, left, mid, arr_size);
            else merge (x, left, mid, right);
        } 
    }
}

function mergesort(x) {
    msort(x, 0, x.length - 1);
}

function merge(x, lo, mid, hi) {
    var a = lo, b = mid + 1, sortp = mid, carry = 0;
    if(x[mid] <= x[b]) {
        return; // checks if already sorted
    }
    while (a <= sortp && b <= hi) {
        if (x[a] <= x[b]) {
            a++;
        }
        else {
            carry = x[b];

            // shift elements forward 1, until a is reached
            for (var i = b; i > a; i--) {
                x[i] = x[i-1];
            }

            // not incrementing the sorted position held me back
            // for a while
            x[a] = carry;
            a++;
            sortp++;
            b++;
        }
    }
}

// From personal code in Lab 01 to generate a random array
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

// From personal code in Lab 01, tests if array is sorted
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

// Main testing program
function progMain() {
        // generates a random array, with a size and value range
        gen_arr = generateArray(50, 99);

        // clones the generated array, to leave unmodified
        ins_arr = gen_arr.map((x) => x);
        console.log("Generated array is: " , ins_arr);
        console.log("IsSorted: " , isSorted(ins_arr));
    
        mergesort(ins_arr);
        console.log("Merge sorted array is: " , ins_arr);
        console.log("IsSorted: " , isSorted(ins_arr) , "\n");
}

progMain();