// TODO: Question 4

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    push(element, priority) {
        this.elements.push({ element, priority });
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

            if (this.elements[index].priority < this.elements[parentIndex].priority) {
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
                this.elements[leftChildIndex].priority < this.elements[smallestChildIndex].priority
            ) {
                smallestChildIndex = leftChildIndex;
            }

            if (
                rightChildIndex < this.elements.length &&
                this.elements[rightChildIndex].priority < this.elements[smallestChildIndex].priority
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

function dijkstraShortestPath(graph, startNode, endNode) {
    const distances = {};
    const previous = {};
    const priorityQueue = new PriorityQueue();

    
    for (const node in graph) {
        distances[node] = node === startNode ? 0 : Infinity;
        priorityQueue.push(node, distances[node]);
    }

    while (priorityQueue.length > 0) {
        const { element: current, priority: currentDistance } = priorityQueue.pop();

        if (current === endNode) {
            return {
                path: reconstructPath(previous, startNode, endNode),
                distance: currentDistance
            };
        }

        for (const neighbor in graph[current]) {
            const newDistance = currentDistance + graph[current][neighbor];

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = current;
                priorityQueue.push(neighbor, newDistance);
            }
        }
    }

    return null; 
}

function reconstructPath(previous, startNode, endNode) {
    const path = [endNode];
    let current = endNode;

    while (current !== startNode) {
        current = previous[current];
        path.unshift(current);
    }

    return path;
}
