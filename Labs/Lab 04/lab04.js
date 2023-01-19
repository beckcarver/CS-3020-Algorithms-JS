// Beckham Carver
// Last Edited: 9/30/2022
// Lab 04
// COSC 3020, Lars Karthoff

// Sources: 
// https://stackoverflow.com/questions/9960908/permutations-in-javascript
// my prog 1 code

// Note: actual runtime takes 10-15 seconds, unless you're tremendously lucky

/*
RUNTIME ANALYSIS:

Our best case for run time is (big-omega) 'n' this happens when we are given a sorted
array, in which case we check the array is sorted and then return the array.

Average runtime is (tight-O) '0.5 * n!' because there are n! total permutations of a given 
array and on average we can expect to search through half of them to find a sorted one.

By doing this systematically we garuntee that our runtime cannot exceed n! ie. our
worst case is (big-O) 'n!' This happens when we are given a REVERSE sorted array.

If permutations were generated randomly (allowing repeats), our runtime could theoretically 
be infinite. Our best case remains the same at 'n' needing only checking if is sorted once.

*/

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

function permutator(inputArr) {

    var results = [0];

    if (isSorted(inputArr)) {
        results.push(inputArr);
        return results;
    }

    function permute(arr, memo, d) {
        done = d;
        if (done) {
            return results;
        }
        else {
            var cur, memo = memo || [];
            for (var i = 0; i < arr.length; i++) {
                cur = arr.splice(i, 1);
                if (arr.length == 0) {
                    results[0]++;
                    if (isSorted(memo.concat(cur))) {
                        results.push(memo.concat(cur));
                        done = true;
                    }
                }
                if (!done) {
                    permute(arr.slice(), memo.concat(cur), done);
                    arr.splice(i, 0, cur[0]);
                }
            }
    
            return results;
        }

    }
    var done = false;
    var memo = [];
    var inpArr = [...inputArr];
    return permute(inpArr, memo, done);
}

function printPermu(inputArr, origArr) {
    console.log("\noriginal array:", origArr,"\n   permutations tried" , inputArr[0] , "\n   sorted array is:" , inputArr[1]);

}

function unitTests() {
    // tests 5 cases:
    //  starts with best case, followed by worst case
    //  followed by three tests that on average should
    //  descending worst -> best/

    presort = [1, 2, 3, 4, 5];
    reverseSort = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

    rand1 = generateArray(10, 50);
    rand2 = generateArray(10, 6);
    rand3 = generateArray(10, 2);
    
    sortD = permutator(presort);
    sort0 = permutator(reverseSort);
    sort1 = permutator(rand1);
    sort2 = permutator(rand2);
    sort3 = permutator(rand3);
    
    printPermu(sortD, presort); // BEST CASE
    printPermu(sort0, reverseSort); // WORST CASE
    printPermu(sort1, rand1); // Avg. #3
    printPermu(sort2, rand2); // Avg. #2
    printPermu(sort3, rand3); // Avg. #1
}

unitTests();



