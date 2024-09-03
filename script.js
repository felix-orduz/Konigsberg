$(document).ready(function () {
  toastr.options = {
      "closeButton": true,
      "progressBar": true,
      "positionClass": "toast-top-center", // Centra el toast en la parte superior
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
  };

});

const DEFAULT_NODE_COLOR = "#97C2FC";
const SELECTED_NODE_COLOR = "#AAAA00";
const HIGHLIGHT_NODE_COLOR = "#FFAA00";
const DEFAULT_EDGE_COLOR = "#000000";
const SELECTED_EDGE_COLOR = "#FFAABB";

const colorEdge = {
  color: DEFAULT_EDGE_COLOR,
  highlight: DEFAULT_EDGE_COLOR,
  hover: DEFAULT_EDGE_COLOR,
  inherit: false,
  opacity: 1.0,
};

const colorEdgeSelected = {
  color: SELECTED_EDGE_COLOR,
  highlight: SELECTED_EDGE_COLOR,
  hover: SELECTED_EDGE_COLOR,
  inherit: false,
  opacity: 1.0,
};

const nodes = new vis.DataSet([
  { id: 1, label: "A", x: 0, y: 0, fixed: true, color: DEFAULT_NODE_COLOR },
  { id: 2, label: "B", x: 0, y: 100, fixed: true, color: DEFAULT_NODE_COLOR },
  { id: 3, label: "C", x: 0, y: -100, fixed: true, color: DEFAULT_NODE_COLOR },
  { id: 4, label: "D", x: 100, y: 0, fixed: true, color: DEFAULT_NODE_COLOR },
]);

let selectedEdges = [];
let selectedNodes = [];
let lastSelected = "";

const createEdge = (id, from, to, label) => ({
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
});

const edges = new vis.DataSet([
  createEdge(1, 1, 2, "1"),
  createEdge(2, 1, 2, "2"),
  createEdge(3, 1, 3, "3"),
  createEdge(4, 1, 3, "4"),
  createEdge(5, 1, 4, "5"),
  createEdge(6, 3, 4, "6"),
  createEdge(7, 2, 4, "7"),
]);

const container = document.getElementById("network");
const data = { nodes: nodes, edges: edges };
const options = {
  autoResize: false,
  physics: true,
  interaction: {
    dragNodes: false, // no permitir arrastrar nodos
    zoomView: false, // no permitir zoom
    dragView: false, // no permitir arrastrar
  },
};

const network = new vis.Network(container, data, options);

network.on("selectNode", ({ nodes: selectedNodesList, edges: connectedEdges }) => {
  network.setSelection({ nodes: [], edges: [] });

  if (lastSelected === "N") {
    toastr.info("Debes Seleccionar Primero una Arista");
    return;
  }

  const currentNode = selectedNodesList[0];

  if (lastSelected === "E" && !connectedEdges.includes(selectedEdges[selectedEdges.length - 1])) {
    toastr.info("Debes seleccionar un Vertice (nodo) que conecte a la última arista seleccionada");
    return;
  }

  selectedNodes.push(currentNode);
  lastSelected = "N";
  colorSelectedNodes();
  nodes.update({ id: currentNode, color: SELECTED_NODE_COLOR });
});

const colorSelectedNodes = () => {
  selectedNodes.forEach(node => {
    nodes.update({ id: node, color: HIGHLIGHT_NODE_COLOR });
  });
};

network.on("selectEdge", ({ edges: selectedEdgesList }) => {
  if (selectedEdgesList.length === 0) return;

  network.setSelection({ nodes: [], edges: [] });

  if (lastSelected === "E" || lastSelected === "") {
    toastr.info("Debes Seleccionar Primero un Vertice (nodo)");
    return;
  }

  const currentEdge = selectedEdgesList[0];

  if (selectedEdges.includes(currentEdge)) {
    toastr.info("Ya has seleccionado este Vertice (nodo)");
    return;
  }

  const currentEdgeObject = edges.get(currentEdge);
  const lastSelectedNode = selectedNodes[selectedNodes.length - 1];

  if (currentEdgeObject.from !== lastSelectedNode && currentEdgeObject.to !== lastSelectedNode) {
    toastr.info("Debes seleccionar una arista que conecte al ultimo nodo seleccionado");
    return;
  }

  selectedEdges.push(currentEdge);
  lastSelected = "E";

  edges.update({ id: currentEdge, color: colorEdgeSelected });
});
