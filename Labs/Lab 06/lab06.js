// Beckham Carver
// Last Edited: 3/24/2023
// Lab 06
// COSC 3020, Lars Karthoff


// My DFS is theta(|V|+|E|) in the worst case, it will firstly go over every verticy for marking
// and then over each verticy's edges to check if it has been marked. This worst case happens
// when the node being searched for is the furthest recursive path from the start node. Such
// as a bottom-rightmost node in a tree.

// this can be checked imperically by switching the same graph to undirected and seeing the
// edge count increase twofold.


class NodeAdj {
    // I spelled constructor wrong and spent two hours debugging.
    // ...I really wish the compiler caught that
    constructor(value, gkey) {
        this.Value = value;
        this.Adj = [];
        // allows for random keys, value associated keys, and custom keys
        if (gkey == null) {
            this.Key = Math.random().toString(16).slice(10);
        }
        else if (gkey == 1) {
            this.Key = value.toString(10);
        }
        else {
            this.Key = gkey;
        }
    }

    getKey() {
        return this.Key;
    }
   
    getVal() {
        return this.Value;
    }

    getAdj() {
        return this.Adj; 
    }

    isAdj(key) {
        return this.Adj.indexOf(key);
    }

    // I wants types back :(
    addAdj(key) {
        this.Adj.push(key) > 1;
    }

    remAdj(key) {
        try {
            this.adj.splice(this.Adj.indexOf(key), 1);
            return key;
        }
        catch(error) {
            console.error(error);
        }
    }
}


// I had intended to use Object ID's as keys for this map but sadly Javascript does not have
// them. So I created a key in the NodeAdj class.
class GraphAdj {
    constructor(directed) {
        this.Directed = directed;
        this.Nodes = new Map();
    }

    printGraph() {
        for (const node of this.Nodes.values()) {
            console.log("node", node.getKey(),"::");
            let adjL = node.getAdj();
            if (adjL[0]) {
                for (const adjNode of adjL) {
                    console.log("       ", adjNode);
                } 
            }
            else {
                console.log("        leaf");
            }

        }
    }

    // takes type NodeAdj or convertable value
    addVertex(val) {
       // if is already a NodeAdj, add it
        if (val instanceof NodeAdj) {
            // if this is a duplicate return, otherwise
            if (this.Nodes.has(val.getKey())) {
                return val;
            }
            this.Nodes.set(val.getKey(), val);
            return val;
        }
        // if not a type NodeAdj, assume as value and create NodeAdj
        else {
            console.error("ASSUMPTION: cast/conversion made to NodeAdj");
            const vertex = new NodeAdj(val);
            this.Nodes.set(vertex.getKey(), vertex);
            return vertex;
        }



    }
  
    // takes type NodeAdj, or convertable value
    addEdge(source, dest) {
        // addVertex cleans & checks values, and returns type NodeAdj
        const source_node = this.addVertex(source);
        const dest_node = this.addVertex(dest);

        // always connect source->dest
        source_node.addAdj(dest_node.getKey());

        // if not directed, dest->source
        if(!this.Directed) {
            dest_node.addAdj(source_node.getKey())
        }

        return [source_node, dest_node];
    }

    // takes ONLY type NodeAdj, because no valid conversion can be made to a Key
    remVertex(vertex) {
        // check if type NodeAdj
        if (!vertex instanceof NodeAdj) {
            console.log("invalid vertex given, not of type 'NodeAdj'")
            return 0;
        }
        // find and remove adjacent vertices, then remove vertex
        if (this.Nodes.has(vertex.getKey())) {
            for (const adj_node of this.Nodes.values()) {
                adj_node.remAdj(vertex);
            }
            this.Nodes.delete(vertex.getKey());
            return 1;
        } 
        // if vertex not found
        else {
            console.log("vertex not found");
            return 0;
        }
    }

    // takes only type NodeAdj
    remEdge(source, dest) {
        if (!source instanceof NodeAdj || !dest instanceof NodeAdj) {
            console.log("invalid vertecies given, not of type 'NodeAdj'")
            return 0;
        }
        // if source is present
        if (this.Nodes.has(source.getKey())) {
            // remove source->dest
            source.remAdj(dest);

            // if not directed, and destination is present
            if(!this.Directed && this.Nodes.has(dest.getKey())) {
                // remove dest->source
                dest_node.remAdj(source)
            }
        }
        
        return [source, dest];
    }

}


// creates a full binary tree of depth 'n'
function fullTree(gr, node, n) {
    if (n <= 0) {
        return 0;
    }
    else {
        n--;
        let tm1 = new NodeAdj("a" + (n).toString(10));
        let tm2 = new NodeAdj("b" + (n).toString(10));

        gr.addEdge(node, tm1);
        fullTree(gr, tm1, n);
        
        gr.addEdge(node, tm2);
        fullTree(gr, tm2, n);

    }

}





                // DEPTH FIRST SEACH CODE BELOW //





// My implemenation can be modified easily to search for matching values rather than
// matching keys see line 218
function depthFirstSearch(graph, start, node) {
    const mark = new Map(graph.Nodes);
    return dfs(mark, start, node);

}

function dfs(mark, start, seek) {
    //console.log("recursive count");
    
    // change getKey to getVal and you can check for values.
    if (seek.getKey() === start.getKey()) {
        // clear map, node has been found
        mark.clear();
        console.log("!! found !!", start);
        return true;
    }
    
    mark.delete(start.getKey());
    let adjL = start.getAdj();

    for (const adjKey of adjL) {
        console.log("iteration count");
        if (mark.has(adjKey)){
            if (dfs(mark, mark.get(adjKey), seek)) return seek;
        }
    }
}





// test code
const gr = new GraphAdj(false);
const root = new NodeAdj("root", 1);
const left = new NodeAdj("left", 1);
const right = new NodeAdj("right", 1);

gr.addEdge(root, left);
gr.addEdge(root, right);
fullTree(gr, left, 2);
fullTree(gr, right, 2);
//gr.printGraph();

// better case (first recursive call)
console.log(depthFirstSearch(gr, root, left));

// average case (midway recursive call)
console.log(depthFirstSearch(gr, root, right));

// worst case (doesn't exist)
console.log(depthFirstSearch(gr, root, new NodeAdj("none", 1)));



















