// Beckham Carver
// Last Edited: 9/23/2022
// Lab 02
// COSC 3020, Lars Karthoff

// Run time is n * log(n) because log(n) steps are taken to divide
// the list. And then after the list is divided, all of the totals
// are added up individually, which is of O(n). When adding together all members of
// an array a simple for loop that adds all will always be the fastest.

function divSum(arr, total) {
    if (arr.length <= 2) {
        for (let i=0; i < arr.length; i++) {
            let total = 0;
            total += arr[i];
        }
        return total;
    }
    if (arr.length > 2) {
        var len = arr.length;
        var arr1 = [];
        for (let i = len/3; i >= 0; i--) {
            arr1.push(arr[i]);
        }
        var arr2 = [];
        for (let i = (len/3) * 2; i >= len; i--) {
            arr2.push(arr[i]);
        }
        var arr3 = [];
        for (let i = len-1; i >= (len/3) * 2; i--) {
            arr3.push(arr[i]);
        }
        console.log(divSum(arr1) , divSum(arr2) , divSum(arr3))
        return divSum(arr1, total) + divSum(arr2, total) + divSum(arr3, total);
    }

}

function divideThreeSum(arr) {
    var total = 0;
    return divSum(arr, total)
}

arr = [1, 1, 1, 1, 1, 1];
console.log(divideThreeSum(arr));