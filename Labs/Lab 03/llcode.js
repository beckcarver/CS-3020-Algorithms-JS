

function sumArray(anArray, size)
{
    //base case
    if (size == 0)
    {
        return 0;
    }
    else if (size == 1)
    {
        console.log(anArray);
        return anArray[0];
    }

    //divide and conquer
    let mid = size / 2;
    let rsize = size - mid;
    let lsum = sumArray(anArray, mid);
    let rsum = sumArray(anArray + mid, rsize);
    return lsum + rsum;
}


function sumThreeArray(arr) {
    return sumArray(arr, arr.length)
}


arr = [1, 2];
console.log(sumThreeArray(arr));