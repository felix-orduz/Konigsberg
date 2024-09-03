const colorEdge = {
  color: "#000000",
  highlight: "#000000",
  hover: "#000000",
  inherit: false,
  opacity: 1.0,
};
const colorEdgeSelected = {
  color: "#FFAABB",
  highlight: "#FFAABB",
  hover: "##FFAABB",
  inherit: false,
  opacity: 1.0,
};

let nodes = new vis.DataSet([
  { id: 1, label: "A", x: 0, y: 0, fixed: true, color: "#97C2FC" },
  { id: 2, label: "B", x: 0, y: 100, fixed: true, color: "#97C2FC" },
  { id: 3, label: "C", x: 0, y: -100, fixed: true, color: "#97C2FC" },
  { id: 4, label: "D", x: 100, y: 0, fixed: true, color: "#97C2FC" },
]);

let selectedEdges = [];
let selectedNodes = [];
let lastSelected = "";

createEdge = (id, from, to, label)=>{
  return {
    id: id,
    from: from,
    to: to,
    label: label,
    color: colorEdge,
    font: { size: 25, strokeWidth: 5 },
    scaling: { min: 10, max: 10 },
    width: 2,
    selectionWidth: false,
    labelHighlightBold: false,
  }
};

let edges = new vis.DataSet([
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

let container = document.getElementById("network");
let data = { nodes: nodes, edges: edges };
let options = {
  autoResize: false,
  physics: true,
  interaction: {
    dragNodes: false, // do not allow dragging nodes
    zoomView: false, // do not allow zooming
    dragView: false, // do not allow dragging
  },
};
let network = new vis.Network(container, data, options);

let steps = 0;
let crossedEdges = [];
let lastSelectedNode = null;
let lastSelectedEdge = null;

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

