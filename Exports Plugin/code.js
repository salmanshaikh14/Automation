
// Let Figma decide initial size (no forced width/height)
figma.showUI(__html__, { width: 1000, height: 1000 });

let w = 480, h = 600;

async function exportNode(node, msg) {
  const scale = msg.scale || 1;
  const format = msg.format || "PNG";

  const bytes = await node.exportAsync({
    format,
    constraint: { type: "SCALE", value: scale }
  });

  figma.ui.postMessage({
    type: "file",
    nodeId: node.id,
    name: node.name.replace(/\s+/g, "_"),
    bytes: Array.from(bytes),
    width: Math.round(node.width * scale),
    height: Math.round(node.height * scale),
    dpi: Math.round(72 * scale),
    format,
    target: msg.target,
    scale,
    preview: msg.preview,
    autoScale: msg.autoScale
  });
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === "resize") {
    w = Math.max(360, msg.width);
    h = Math.max(400, msg.height);
    figma.ui.resize(w, h);
  }

  if (msg.type === "export") {
    const nodes = figma.currentPage.selection;
    if (!nodes || nodes.length === 0) {
      figma.notify("Please select at least one frame or layer.");
      return;
    }
    
    figma.ui.postMessage({ type: 'count', total: nodes.length, preview: msg.preview, zipName: figma.root.name.replace(/\s+/g,'_') });
    for (const node of nodes) {
      if ("exportAsync" in node) await exportNode(node, msg);
    }
  }

  if (msg.type === "reexport") {
    const node = figma.getNodeById(msg.nodeId);
    if (node && "exportAsync" in node) await exportNode(node, msg);
  }
};
