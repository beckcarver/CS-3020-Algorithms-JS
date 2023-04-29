/*
Beckham Carver - W09874167
Sources:
https://stackoverflow.com/questions/45163256/how-to-format-numbers-as-percentage-values-in-javascript
https://stackoverflow.com/questions/9206914/how-to-filter-multidimensional-javascript-array
https://stackoverflow.com/questions/24812371/deleting-a-column-from-a-multidimensional-array-in-javascript




Provided psuedocode:
// cities is the set of cities not visited so far, including
start
heldKarp(cities, start)
    if |cities| == 2
        return length of tour that starts at start, goes directly
        to other city in cities
    else
        return the minimum of
            for each city in cities, unless the city is start
                    // reduce the set of cities that are unvisited by one
                    (the old start), set the new start, add on the
                    distance from old start to new start
                heldKarp(cities - start, city) + distance from start to
                city

*/

// GOTO Line 92 to print the seeded test graphs, they are hidden by default



// Usage: test(function, max-dimension, seed, scale, print)
test(tsp_hk, 18, 1, 10, false);


// counts calls of heldKarp, and memoized calls
var iter = 0;
var memo = 0;

function tsp_hk(distance_matrix) {
    const dict = {};
    iter = 0;
    memo = 0;
    let ret = heldKarp(distance_matrix, 0, dict);
    console.log(
            "Iter", iter, "| Memo", memo, "|",
            (memo/iter).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}));
    return ret;
}


function heldKarp(cities, start, dict) {
    iter++;
    let key = start.toString() + cities.toString();

    // if memoized, return
    if (dict[key] !== undefined) {
        memo++;
        return dict[key];
    }
    // if finished, return
    if (cities.length == 2) {
        return start == 0 ? cities[0][1] : cities[1][0];
    } else {
        let min = Infinity;
        let tmp;

        // remove start-row
        let subCities = cities.filter((_, r) => r !== start)
        // remove start-column
        subCities = subCities.map((row) => row.filter((_, c) => c !== start));

        let newStart = 0;
        for (let i = 0; i < cities.length; i++) {
            if (cities[start][i] !== 0) {
                tmp = heldKarp(subCities, newStart++, dict) + cities[start][i];
                if (tmp < min) {
                    min = tmp;
                }
            }
        }
        dict[key] = min;
        return min;
    }
}

function createMatrix(len, seed, scale, print) {
    function random(seed) {
        var x = Math.sin(seed) * 10000; 
        return x - Math.floor(x);
    }
    var result = [];
    for (var i = 0 ; i < len; i++) {
        result[i] = [];
        for (var j = 0; j < len; j++) {
            if(i == j) {
                result[i][j] = 0;
            } else {
                let val = Math.floor(scale * random(seed));
                result[i][j] = val;
                seed++;
            }
        }
    }
    for (var i = 0 ; i < len; i++) {
        for (var j = 0; j < len; j++) {
            result[i][j] = result[j][i];
            
        }
        // HERE TO PRINT TEST GRAPHS
        if (print) {
            console.log(...result[i]);
        }
    }
    return result;
}


function test(testfunc, size = 10, seed = 1, scale = 10, print = false) {
    let testgraph = [[0]];
    for(let i = 0; i <= size; i++) {
        // syntax is (size, seed, scale)
        testgraph = createMatrix(i, seed, scale, print);
    
        const start = performance.now();
        const result = tsp_hk(testgraph)
        const end = performance.now();
    
        console.log(`(${(i)}x${(i)}) Result ${result} | Time ${((end - start)/1000).toFixed(4)} seconds\n`);
    
    }
}


