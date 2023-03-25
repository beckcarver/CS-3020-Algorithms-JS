// Beckham Carver
// Last Edited: 3/24/2023
// Lab 06
// COSC 3020, Lars Karthoff

class NodeAdj {
    constuctor(value) {
        this.Value = value;
        this.Adj = [];
        this.Key = "id";
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

    isAdj(node) {
        return this.Adj.indexOf(node);
    }

    // I wants types back :(
    addAdj(node) {
        this.adjacents.push(node);
    }

    remAdj(node) {
        try {
            this.adj.splice(this.Adj.indexOf(node), 1);
            return node;
        }
        catch(error) {
            console.error(error);
        }
    }
}


// I had intended to use Object ID's as keys for this map but sadly Javascript does not have
// them. So i'll be a node key as keys
class GraphAdj {
    constuctor(directed) {
        this.Directed = directed;
        this.Nodes = new Map();
    }

    // takes type NodeAdj or convertable value
    addVertex(vertex) {
        // if not a type NodeAdj, assume as value and create NodeAdj
        if (!vertex instanceof NodeAdj) {
            console.log("ASSUMPTION: cast/conversion made to NodeAdj");
            vertex = new NodeAdj(vertex);

        }

        // if duplicate, we merely overrite with itself
        this.Nodes.set(vertex.getKey(), vertex);
        return vertex;

    }
  
    // takes type NodeAdj, or convertable value
    addEdge(source, dest) {
        // addVertex cleans & checks values, and returns type NodeAdj
        const source_node = this.addVertex(source);
        const dest_node = this.addVertex(dest);

        // always connect source->dest
        source_node.addAdj(dest_node);

        // if not directed, dest->source
        if(!this.Directed) {
            dest_node.addAdj(source_node)
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


const v1 = new NodeAdj(3);
console.log("key", v1.getKey())
console.log("val", v1.getVal())



