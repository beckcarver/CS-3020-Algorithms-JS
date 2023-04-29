/*
Beckham Carver - W09874167

Sources:
https://stackoverflow.com/questions/45163256/how-to-format-numbers-as-percentage-values-in-javascript
https://stackoverflow.com/questions/9206914/how-to-filter-multidimensional-javascript-array
https://stackoverflow.com/questions/24812371/deleting-a-column-from-a-multidimensional-array-in-javascript

*/

// Global vars for counting iterations and memoization usage
var iter = 0;
var memo = 0;

// Usage: test(func, max-dimension, seed, scale, print)
// because the seed is identical, they operate on the same graphs, everytime
test(tsp_ls,24, 1, 10, false);
test(tsp_hk,24, 1, 10, false);



function tsp_hk(distance_matrix) {
    const dict = {};
    iter = 0;
    memo = 0;
    let min = Infinity;
    let tmp = Infinity;
    for (let i = 0; i < distance_matrix.length; i++) {
        tmp = heldKarp(distance_matrix, i, dict);
        if (tmp < min) {
            min = tmp;
        }
    }
    return min;
}

function readDist(i, j, cities) {
    if (i >= cities.length || j >= cities.length) {
        return;
    }
    return cities[i][j];
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
    } else if (cities.length < 2) {
        return Infinity;
    }
    else {

        let min = Infinity;
        let tmp;

        // row
        let subCities = cities.filter((_, r) => r !== start)
        // column
        subCities = subCities.map((row) => row.filter((_, c) => c !== start));

        let newStart = 0;
        for (let i = 0; i < subCities.length; i++) {
            if (readDist(start, i, subCities) !== 0) {
                tmp = heldKarp(subCities, newStart++, dict) + readDist(start, i, subCities);
                if (tmp < min) {
                    min = tmp;
                }
            }
        }
        dict[key] = min;
        return min;
    }
}

function tsp_ls(distance_matrix) {
    const trials = Math.pow(distance_matrix.length, 5);
    let minCost = Infinity;
    let tmpCost = Infinity;
    let limit = 0;

    for (let i = 0; i < trials; i++) {
        iter++;
        const randPath = randomizePath(distance_matrix.length);
        const currentPath = twoOpt(distance_matrix, randPath);
        tmpCost = cost(distance_matrix, currentPath);
        if (tmpCost < minCost) {
            minCost = tmpCost;
            limit = 0;
        } else {
            limit++;
        }

        if (limit >= 500) {
            break;
        }
    }

    return minCost;
}

function twoOpt(cities, currentPath) {
    let bestPath = currentPath.slice();

    let bestCost = cost(cities, bestPath);
    for (let i = 1; i < bestPath.length - 2; i++) {
        for (let k = i + 1; k < bestPath.length - 1; k++) {
            const newPath = twoOptSwap(bestPath, i, k);
            let newCost = cost(cities, newPath);

            if (newCost < bestCost) {
                bestPath = newPath.slice();
            }
        }
    }

    return bestPath;
}

function twoOptSwap(route, i, k) {
    const first = route.slice(0, i);
    const second = route.slice(i, k + 1).reverse();
    const third = route.slice(k + 1);
    return [...first, ...second, ...third];
}

function cost(cities, path) {
    let sum = 0;
    for (let i = 0; i < path.length - 1; i++) {
        if (cities[path[i]] == 0) {
            return Infinity;
        }
        sum += cities[path[i]][path[i + 1]];
    }
    return sum;
}

function randomizePath(length) {
    const cities = Array.from({ length }, (_, i) => i);
    const randPath = [];

    while (cities.length) {
        const index = Math.floor(Math.random() * cities.length);
        randPath.push(cities[index]);
        cities.splice(index, 1);
    }

    return randPath;
}

function test(testfunc, size = 10, seed = 1, scale = 10, print = false) {
    function createMatrix(len, seed, scale, print) {
        function random(seed) {
            var x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        }
        var result = [];
        for (var i = 0; i < len; i++) {
            result[i] = [];
            for (var j = 0; j < len; j++) {
                if (i == j) {
                    result[i][j] = 0;
                } else {
                    let val = Math.floor(scale * random(seed));
                    result[i][j] = val;
                    seed++;
                }
            }
        }
        for (var i = 0; i < len; i++) {
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

    let testgraph = [[0]];
    for (let i = 0; i <= size; i++) {
        // syntax is (size, seed, scale)
        testgraph = createMatrix(i, seed, scale, print);

        iter = 0;
        memo = 0;
        let start = Date.now();
        result = testfunc(testgraph);
        let end = Date.now();

        console.log(testfunc.name, "Iter", iter, "| Memo", memo, "|",
            (memo / iter).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 }));
        console.log(`(${(i)}x${(i)}): Result ${result} | Time ${((end - start) / 1000).toFixed(4)} seconds\n`);
    }
}


