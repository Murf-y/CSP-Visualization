import Graph from "./graph.js";

// get all the circles
let circles = document.querySelectorAll(".circle");

// draw a line between two circles
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

const constraints = [
  [0, 1],
  [0, 3],
  [1, 2],
  [1, 4],
  [2, 5],
  [3, 4],
  [3, 6],
  [3, 1],
  [4, 5],
  [4, 7],
  [4, 2],
  [5, 8],
  [6, 7],
  [6, 4],
  [7, 8],
  [7, 5],
];

const graph = new Graph(circles);

for (let i = 0; i < constraints.length; i++) {
  graph.addEdge(constraints[i][0], constraints[i][1]);
  drawLine(circles[constraints[i][0]], circles[constraints[i][1]], "gray", "2");
}
