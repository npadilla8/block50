// TODO: Question 2

// This question can be answered using BFS to find the shortest path

function bfsShortestPath(graph, source, target) {
    if (!graph[source] || !graph[target]) {
        console.error("Source or target node not found in the graph.");
        return null;
    }

    const queue = [source];
    const visited = new Set([source]);
    const previous = {};

    while (queue.length > 0) {
        const current = queue.shift();

        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                previous[neighbor] = current;

                if (neighbor === target) {
                    
                    return reconstructPath(previous, source, target);
                }
            }
        }
    }

    console.error("No path found from source to target.");
    return null;
}

function reconstructPath(previous, source, target) {
    const path = [target];
    let current = target;

    while (current !== source) {
        current = previous[current];
        path.unshift(current);
    }

    return path;
}


const graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A', 'F'],
    D: ['B'],
    E: ['B', 'F'],
    F: ['C', 'E']
};

const sourceNode = 'A';
const targetNode = 'F';


const shortestPath = bfsShortestPath(graph, sourceNode, targetNode);


console.log(`Shortest path from ${sourceNode} to ${targetNode}:`, shortestPath);
