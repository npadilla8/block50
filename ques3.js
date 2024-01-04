// TODO: Question 3

function dfsAllRoutes(graph, source, target) {
    if (!graph[source] || !graph[target]) {
        console.error("Source or target node not found in the graph.");
        return null;
    }

    const allRoutes = [];
    const visited = new Set();

    dfs(source, [source]);

    function dfs(node, currentRoute) {
        visited.add(node);

        if (node === target) {
            allRoutes.push([...currentRoute]);
        } else {
            for (const neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    currentRoute.push(neighbor);
                    dfs(neighbor, currentRoute);
                    currentRoute.pop();
                }
            }
        }

        visited.delete(node);
    }

    return allRoutes;
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


const allRoutes = dfsAllRoutes(graph, sourceNode, targetNode);


console.log(`All possible routes from ${sourceNode} to ${targetNode}:`, allRoutes);
