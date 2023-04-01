// Beckham Carver
// Last Edited: 3/31/2023
// Prog 02
// COSC 3020, Lars Karthoff
//
// Utilizes breadth first search to find a path, saving edge traversals along the way, 
// these traversals can then be followed in reverse to output the final path.
// function takes a graph followed by two valid keys of that graph.

// Sources:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
// https://www.tutorialrepublic.com/faq/how-to-get-the-length-of-a-javascript-object.php
// https://stackoverflow.com/questions/4244896/accessing-an-object-property-with-a-dynamically-computed-name





// I know now that a queue can be simulated/achieved a queue just using a list and 
// push/shift but having error logging is nice, and I did this before I knew that
class Queue {
    constructor(log) {
        this.front = 0;
        this.rear = 0;
        this.log = false;
        if (log) this.log = true;
        this.items = [];
    }
    isEmpty() {
        if (this.log) console.log("isEmpty:", this.rear - this.head);
        return (this.rear - this.head);
    }
    enqueue(item) {
        this.items[this.rear] = item;
        this.rear++;
        if (this.log) console.log("enque:" , this.items[this.rear -1] , "typeof:" , 
            typeof(this.items[this.rear -1]));
    }
    dequeue() {
        const tmp = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        if (this.log) console.log("deque:" , tmp, "typeof:", typeof(tmp));
        return tmp;
    }
    peek() {
        return this.items[this.front];
    }
    getList() {
        return this.items;
    }
}

function testInput(graph, start, end) {
    // If empty graph, is invalid
    if (Object.keys(graph).length <= 0) {
        console.error("invalid graph: cannot be empty");
        return [];
    }
    // Try to read keys, check for validity
    try {
        Object.keys(graph[start]);
        Object.keys(graph[end]);
    } catch(error) {
        console.error("keys 'start' / 'end' are invalid");
        return [];
    }
    if (Object.keys(graph).length == 1) {
        console.log("graph contains single vertex");
        return [Object.keys(graph)[0]];
    }
    return 1;
}

function augmentingPath(graph, start, end) {

    // tests input for errors and edge cases
    let test =  testInput(graph, start, end);
    if (test !== 1) return test;

 
    // initalize visit tracker, and queue (plus I finally got to use a map outside FP)
    var visit = new Map(Object.keys(graph).map(i => [i, false])); 
    visit.set(start, true);         
    let queue = new Queue();
    queue.enqueue(start);

    // this path will receive unvisited edge pairs, parsed in reverse at the end
    let path = {};
    path[start] = start;
    let found = false;

    // breadth first search
    search:
    while(!queue.isEmpty()) {
        let popped = queue.dequeue();
        let adjacent;
        try {
            adjacent = Object.keys(graph[popped]);
        } catch(error) {
            console.error("invalid edge in graph, edge points to non-existant vertex");
        }
        
        for(const adj of adjacent) {
            // console.log("adj:", adj, "marked:", visit.get(adj), "\n");
            if (adj === end) {
                path[adj] = popped;
                found = true;
                break search;  // okay I hate javascript less now
            }
            if(visit.get(adj) === false) {
                visit.set(adj, true);//
                queue.enqueue(adj);
                path[adj] = popped;
            }
        }
    }
    // if not found return empty list
    if (!found) return [];
    // using saved edge traversals, follow from final vertex back to start
    let ret = [end];
    let next = path[end];
    while(ret[0] !== start) {
        ret.unshift(next)
        next = path[next];
    }

    return ret;
}

// didn't learn about Object.keys until after I wrote this print function
function printGraph(graph) {
    console.log("\n----- print graph -----");
    for (const vert in graph) {
        console.log(`${vert} ->`);
        for (const edge in graph[vert]) {
            console.log(`   ${edge} :`, graph[vert][edge]);
        }
    }           
    console.log("\n")
}


// TESTS BELOW //
var g1 = {
    'a': {'b': 7},
    'b': {'a': 3, 'c': 2},
    'c': {'b': 4}
};
printGraph(g1)
console.log("test 1:" , augmentingPath(g1, Object.keys(g1)[0], Object.keys(g1)[2]));


var g2 = {
    1 : {4 : 0},
    2 : {5 : 0},
    3 : {2 : 0},
    4 : {1 : 0, 3 : 0, 6 : 0},
    5 : {6 : 0},
    6 : {7 : 0},
    7 : {4 : 0}
};
printGraph(g2)
console.log("test 2:" , augmentingPath(g2, Object.keys(g2)[0], Object.keys(g2)[6]));


var g3 = {
    'foo' : {'foo' : 0},
};
printGraph(g3)
console.log("test 3:" , augmentingPath(g3, Object.keys(g3)[0], Object.keys(g3)[0]));


var g4 = {
    1 : { 'fail' : 0, 4 : 0},
    2 : {5 : 0},
    3 : {100 : 0, 2 : 0},
    4 : {'nothing' : 0, 3 : 0},
    5 : {6 : 0},
    6 : {7 : 0},
    7 : {4 : 0}
};
printGraph(g4)
console.log("test 2:" , augmentingPath(g4, Object.keys(g4)[0], Object.keys(g4)[6]));


var g5 = {
    'k' : {}
};
printGraph(g5)
console.log("test 5:" , augmentingPath(g5, Object.keys(g5)[0], Object.keys(g5)[0]));


var g6 = {

};
printGraph(g6)
console.log("test 6:" , augmentingPath(g6, Object.keys(g6)[0], Object.keys(g6)[0]));


