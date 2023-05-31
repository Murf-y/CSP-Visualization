import { ColorEnum } from "./main.js";

class Node {
  constructor(element, color, index) {
    this.element = element;
    this.color = color;
    this.index = index;
  }

  changeColor(color) {
    this.color = color;
    this.element.style.backgroundColor = color;
  }
}

class Graph {
  constructor(circles) {
    //   nodes is an array of circles (html div elements)
    //  trasnform it into Node objects
    this.nodes = [];
    for (let i = 0; i < circles.length; i++) {
      this.nodes[i] = new Node(circles[i], ColorEnum.NONE, i);
    }

    this.numberOfVertices = this.nodes.length;
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
    //  Returns an array of Node objects

    let neighbors = [];
    for (let i = 0; i < this.numberOfVertices; i++) {
      if (this.matrix[vertex][i] === 1) {
        neighbors.push(this.nodes[i]);
      }
    }
    return neighbors;
  }

  getNode(i) {
    return this.nodes[i];
  }

  isValidColor(vertex, color) {
    let neighbors = this.getNeighbors(vertex);
    for (let i = 0; i < neighbors.length; i++) {
      if (neighbors[i].color === color) {
        return false;
      }
    }
    return true;
  }

  getValidColors(vertex) {
    let validColors = [];
    for (let color in ColorEnum) {
      if (this.isValidColor(vertex, ColorEnum[color])) {
        validColors.push(ColorEnum[color]);
      }
    }
    return validColors;
  }

  isSatisfied() {
    for (let i = 0; i < this.numberOfVertices; i++) {
      if (!this.isValidColor(i, this.nodes[i].color)) {
        return false;
      }
    }

    // make sure all nodes have a color
    for (let i = 0; i < this.numberOfVertices; i++) {
      if (this.nodes[i].color === ColorEnum.NONE) {
        return false;
      }
    }

    return true;
  }

  getNodes() {
    return this.nodes;
  }
}

export { Graph, Node };
