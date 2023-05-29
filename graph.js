// graph implementation using adjacency matrix

class Graph {
  constructor(nodes) {
    //   nodes is an array of objects
    this.nodes = nodes;
    this.numberOfVertices = nodes.length;
    this.matrix = [];
    for (let i = 0; i < this.numberOfVertices; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.numberOfVertices; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  addEdge(v1, v2) {
    this.matrix[v1][v2] = 1;
    this.matrix[v2][v1] = 1;
  }

  removeEdge(v1, v2) {
    this.matrix[v1][v2] = 0;
    this.matrix[v2][v1] = 0;
  }

  print() {
    for (let i = 0; i < this.numberOfVertices; i++) {
      console.log(this.matrix[i]);
    }
  }

  getNeighbors(vertex) {
    //   Returns an array of neighbors (objects not indices)

    let neighbors = [];
    for (let i = 0; i < this.numberOfVertices; i++) {
      if (this.matrix[vertex][i] === 1) {
        neighbors.push(this.nodes[i]);
      }
    }
    return neighbors;
  }
}

export default Graph;
