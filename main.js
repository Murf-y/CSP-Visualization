import { Graph, Node } from "./graph.js";

const ColorEnum = {
  BLUE: "blue",
  RED: "red",
  GREEN: "green",
  NONE: "white",
};
const constraints = [
  // add random edges between 4*4 grid (0, 1, 2, 3)
  [0, 1],
  [0, 6],
  [0, 4],
  [1, 7],
  [1, 2],
  [2, 3],
  [4, 5],
  [4, 6],
  [7, 11],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [5, 9],
  [5, 6],
  [6, 10],
  [2, 6],
  [13, 14],
  [13, 9],
  [12, 13],
  [15, 14],
  [15, 11],
  [12, 8],
  [7, 3],
  [8, 13],
  [6, 3],
];

// get all the circles
let circles = document.querySelectorAll(".circle");
// create a graph with those circle
// internally it will create nodes
const graph = new Graph(circles);

function drawLine(circle1, circle2, color = "black", width = "1") {
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", circle1.offsetLeft + circle1.offsetWidth / 2);
  line.setAttribute("y1", circle1.offsetTop + circle1.offsetHeight / 2);
  line.setAttribute("x2", circle2.offsetLeft + circle2.offsetWidth / 2);
  line.setAttribute("y2", circle2.offsetTop + circle2.offsetHeight / 2);
  line.setAttribute("stroke", color);
  line.setAttribute("stroke-width", width);
  // if svg doesn't exist, create it
  if (!document.querySelector("svg")) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute(
      "style",
      "position: absolute; top: 0; left: 0; z-index: -1;"
    );
    document.body.appendChild(svg);
    svg.appendChild(line);
  } else {
    let svg = document.querySelector("svg");
    document.body.appendChild(svg);
    svg.appendChild(line);
  }
}

for (let i = 0; i < constraints.length; i++) {
  graph.addEdge(constraints[i][0], constraints[i][1]);
  drawLine(circles[constraints[i][0]], circles[constraints[i][1]], "gray", "2");
}
function* naiveSearchGenerator(graph, delay) {
  const stack = [];
  stack.push(graph.getNode(0)); // Start with the first node

  while (stack.length > 0) {
    const currentNode = stack[stack.length - 1];

    if (currentNode.color !== ColorEnum.NONE) {
      stack.pop();
      yield;
      continue;
    }

    console.log(currentNode, stack);
    if (graph.isSatisfied()) {
      console.log("Graph successfully colored!");
      return;
    }

    const validColors = graph.getValidColors(currentNode.index);

    if (validColors.length === 0) {
      // Backtrack
      const previousNode = stack.pop();
      previousNode.changeColor(ColorEnum.NONE);
      yield;
      continue;
    }

    const nextColor = validColors.shift();
    currentNode.changeColor(nextColor);
    yield;

    const neighbors = graph.getNeighbors(currentNode.index);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (neighbor.color === ColorEnum.NONE) {
        stack.push(neighbor);
      }
    }

    yield;
  }

  console.log("Graph cannot be colored with the given constraints.");
}

function naiveSearchWithDelay(graph, delay) {
  const generator = naiveSearchGenerator(graph, delay);

  function iterate() {
    const { done } = generator.next();
    if (!done) {
      setTimeout(iterate, delay);
    }
  }

  iterate();
}

naiveSearchWithDelay(graph, 100);

export { ColorEnum };
