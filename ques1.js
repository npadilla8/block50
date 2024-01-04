// TODO: Question 1 

class Edge {
    constructor(start, end, weight) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}

class Graph {
    constructor() {
        this.edges = [];
        this.adjacencyList = new Map();
    }

    addEdge(edge) {
        this.edges.push(edge);

        if (!this.adjacencyList.has(edge.start)) {
            this.adjacencyList.set(edge.start, []);
        }
        if (!this.adjacencyList.has(edge.end)) {
            this.adjacencyList.set(edge.end, []);
        }

        this.adjacencyList.get(edge.start).push({ node: edge.end, weight: edge.weight });
        this.adjacencyList.get(edge.end).push({ node: edge.start, weight: edge.weight });
    }

    primMST() {
        const visited = new Set();
        const priorityQueue = new PriorityQueue((a, b) => a[1] - b[1]);
        const startNode = 0;

        let totalCost = 0;

        this.addEdgesToQueue(startNode, priorityQueue, visited);

        while (priorityQueue.length > 0) {
            const [currentNode, currentWeight] = priorityQueue.pop();

            if (visited.has(currentNode)) continue;

            visited.add(currentNode);
            totalCost += currentWeight;

            this.addEdgesToQueue(currentNode, priorityQueue, visited);
        }

        return totalCost;
    }

    addEdgesToQueue(node, priorityQueue, visited) {
        const neighbors = this.adjacencyList.get(node);

        neighbors.forEach(neighbor => {
            if (!visited.has(neighbor.node)) {
                priorityQueue.push([neighbor.node, neighbor.weight]);
            }
        });
    }
}

class PriorityQueue {
    constructor(compareFunction) {
        this.elements = [];
        this.compare = compareFunction;
    }

    push(element) {
        this.elements.push(element);
        this.heapifyUp();
    }

    pop() {
        const top = this.elements[0];
        const last = this.elements.pop();

        if (this.elements.length > 0) {
            this.elements[0] = last;
            this.heapifyDown();
        }

        return top;
    }

    heapifyUp() {
        let index = this.elements.length - 1;

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.compare(this.elements[index], this.elements[parentIndex]) < 0) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown() {
        let index = 0;

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestChildIndex = index;

            if (
                leftChildIndex < this.elements.length &&
                this.compare(this.elements[leftChildIndex], this.elements[smallestChildIndex]) < 0
            ) {
                smallestChildIndex = leftChildIndex;
            }

            if (
                rightChildIndex < this.elements.length &&
                this.compare(this.elements[rightChildIndex], this.elements[smallestChildIndex]) < 0
            ) {
                smallestChildIndex = rightChildIndex;
            }

            if (smallestChildIndex !== index) {
                this.swap(index, smallestChildIndex);
                index = smallestChildIndex;
            } else {
                break;
            }
        }
    }

    swap(i, j) {
        [this.elements[i], this.elements[j]] = [this.elements[j], this.elements[i]];
    }

    get length() {
        return this.elements.length;
    }
}

// Sample Input
const edges = [
    new Edge(0, 1, 4), new Edge(0, 7, 8), new Edge(1, 2, 8),
    new Edge(1, 7, 11), new Edge(2, 3, 7), new Edge(2, 8, 2),
    new Edge(2, 5, 4), new Edge(3, 4, 9), new Edge(3, 5, 14),
    new Edge(4, 5, 10), new Edge(5, 6, 2), new Edge(6, 7, 1),
    new Edge(6, 8, 6), new Edge(7, 8, 7)
];

const graph = new Graph();
edges.forEach(edge => graph.addEdge(edge));

// Calculate and print the minimum cost
const minCost = graph.primMST();
console.log(`Minimum cost to connect all rooms: ${minCost}`);

