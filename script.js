// Define nodes and edges for the Königsberg problem
var fontEdge = {
  color: "#000000",
  size: 14, // px
  face: "arial",
  background: "none",
  strokeWidth: 2, // px
  strokeColor: "#ffffff",
  align: "horizontal",
  multi: false,
  vadjust: 0,
  bold: {
    color: "#343434",
    size: 14, // px
    face: "arial",
    vadjust: 0,
    mod: "bold",
  },
  ital: {
    color: "#343434",
    size: 14, // px
    face: "arial",
    vadjust: 0,
    mod: "italic",
  },
  boldital: {
    color: "#343434",
    size: 14, // px
    face: "arial",
    vadjust: 0,
    mod: "bold italic",
  },
  mono: {
    color: "#343434",
    size: 15, // px
    face: "courier new",
    vadjust: 2,
    mod: "",
  },
};
var colorEdge = {
  color: "#000000",
  highlight: "#000000",
  hover: "#000000",
  inherit: false,
  opacity: 1.0,
};
var colorEdgeSelected = {
  color: "#FFAABB",
  highlight: "#FFAABB",
  hover: "##FFAABB",
  inherit: false,
  opacity: 1.0,
};
var nodes = new vis.DataSet([
  { id: 1, label: "A", x: 0, y: 0, fixed: true, color: "#97C2FC" },
  { id: 2, label: "B", x: 0, y: 100, fixed: true, color: "#97C2FC" },
  { id: 3, label: "C", x: 0, y: -100, fixed: true, color: "#97C2FC" },
  { id: 4, label: "D", x: 100, y: 0, fixed: true, color: "#97C2FC" },
]);
var selectedEdges = [];
var selectedNodes = [];
var lastSelected = "";
var choseEdge = function (edgeId, selected) {
  console.log("Edge Selected: " + edgeId);
  console.log("Selected: " + selected);
  if (selected && lastSelected != "N") {
    alert("Debes Seleccionar Primero un Nodo");
    network.setSelection({ nodes: nodesSelected, edges: edgesSeleted });
    return;
  }

  if (selected && lastSelected == "N") {
    edgesSeleted.push(edgeId);
    lastSelected = "E";
    network.setSelection({ nodes: nodesSelected, edges: edgesSeleted });
  }
  alert(edgeId);
};
var edges = new vis.DataSet([
  {
    id: 1,
    from: 1,
    to: 2,
    label: "1",
    color: colorEdge,
    // chosen: { edge: choseEdge },
    font: { size: 25, strokeWidth: 5 },
    scaling: { min: 10, max: 10 },
    width: 2,
    selectionWidth: false,
    labelHighlightBold: false,
  },
  {
    id: 2,
    from: 1,
    to: 2,
    label: "2",
    color: colorEdge,
    font: { size: 25, strokeWidth: 5 },
    scaling: { min: 10, max: 10 },
    width: 2,
    selectionWidth: false,
    labelHighlightBold: false,
  },
  {
    id: 3,
    from: 1,
    to: 3,
    label: "3",
    color: colorEdge,
    font: { size: 25, strokeWidth: 5 },
    scaling: { min: 10, max: 10 },
    width: 2,
    selectionWidth: false,
    labelHighlightBold: false,
  },
  {
    id: 4,
    from: 1,
    to: 3,
    label: "4",
    color: colorEdge,
    font: { size: 25, strokeWidth: 5 },
    scaling: { min: 10, max: 10 },
    width: 2,
    selectionWidth: false,
    labelHighlightBold: false,
  },
  {
    id: 5,
    from: 1,
    to: 4,
    label: "5",
    color: colorEdge,
    font: { size: 25, strokeWidth: 5 },
    scaling: { min: 10, max: 10 },
    width: 2,
    selectionWidth: false,
    labelHighlightBold: false,
  },
  {
    id: 6,
    from: 3,
    to: 4,
    label: "6",
    color: colorEdge,
    font: { size: 25, strokeWidth: 5 },
    scaling: { min: 10, max: 10 },
    width: 2,
    selectionWidth: false,
    labelHighlightBold: false,
  },
  {
    id: 7,
    from: 2,
    to: 4,
    label: "7",
    color: colorEdge,
    font: { size: 25, strokeWidth: 5 },
    scaling: { min: 10, max: 10 },
    width: 2,
    selectionWidth: false,
    labelHighlightBold: false,
  },
]);

var container = document.getElementById("network");
var data = { nodes: nodes, edges: edges };
var options = {
  autoResize: false,
  physics: true,
  interaction: {
    dragNodes: false, // do not allow dragging nodes
    zoomView: false, // do not allow zooming
    dragView: false, // do not allow dragging
  },
};
var network = new vis.Network(container, data, options);

var steps = 0;
var crossedEdges = [];
var lastSelectedNode = null;
var lastSelectedEdge = null;

// // Click event to handle node and edge selection
// network.on("click", function (properties) {
//   selection = network.getSelection();
//   console.log("Selection:", selection);
// });

network.on("selectNode", (opts) => {
  console.log("++++++Node Selected========");
  edgesForNode = opts.edges;
  network.setSelection({ nodes: [], edges: [] });

  console.log("Selected opts:", opts);

  if (lastSelected == "N") {
    alert("Debes Seleccionar Primero una Arista");
    return;
  }

  currentNode = opts.nodes[0];

  // if(selectedNodes.includes(currentNode)) {
  //   alert("Ya has seleccionado este nodo");
  //   return;
  // }

  currentNodeObject = nodes.get(currentNode);
  console.log("currentNodeObject:", currentNodeObject);
  lastSelectedEdge = selectedEdges[selectedEdges.length - 1];

  if (lastSelectedEdge && !edgesForNode.includes(lastSelectedEdge)) {
    alert("Debes seleccionar un Vertice (nodo) que conecte a la última arista seleccionada");
    return;
  }
  selectedNodes.push(currentNode);
  lastSelected = "N";
  colorOtherNodes();
  nodes.update({id: currentNode, color: "#AAAA00"});

});
function colorOtherNodes() {
  for(let node of selectedNodes) {
    nodes.update({id: node, color: "#FFAA00"});
  }
}

network.on("selectEdge", (opts) => {
  if (opts.edges.length == 0) return;

  console.log("lastSelected:", lastSelected)
  console.log("++++++Edge Selected========");
  network.setSelection({ nodes: [], edges: [] });

  console.log("Selected opts:", opts);

  if (lastSelected == "E" || lastSelected == "") {
    alert("Debes Seleccionar Primero un Vertice (nodo)");
    return;
  }

  currentEdge = opts.edges[0];

  if(selectedEdges.includes(currentEdge)) {
    alert("Ya has seleccionado este Vertice (nodo)");
    return;
  }

  currentEdgeObject = edges.get(currentEdge);
  console.log("currentEdgeObject:", currentEdgeObject);
  lastSelectedNode = selectedNodes[selectedNodes.length - 1];

  if (currentEdgeObject.from != lastSelectedNode && currentEdgeObject.to != lastSelectedNode) {
    alert("Debes seleccionar una arista que conecte al ultimo nodo seleccionado");
    return;
  }

  selectedEdges.push(currentEdge);
  lastSelected = "E";

  edges.update({id: currentEdge, color: colorEdgeSelected});


});
