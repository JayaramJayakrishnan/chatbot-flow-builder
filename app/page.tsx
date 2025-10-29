'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import Header from './_components/Header';
import TextMessageNode from './_components/TextMessageNode';
import NodesPanel from './_components/NodesPanel'
import SettingsPanel from './_components/SettingsPanel';
import CustomSnackbar from './_components/Snackbar';


const nodeTypes: NodeTypes = {
  textMessage: TextMessageNode,
};

export default function ChatbotFlowBuilder() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodeText, setNodeText] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showAlert, setShowAlert] = useState({show: false, message: "", status: ""})

  const onConnect = useCallback(
    (params: Connection) => {
      // Check if source handle already has an edge
      const sourceHasEdge = edges.some(
        (edge) => edge.source === params.source && edge.sourceHandle === params.sourceHandle
      );
      
      if (sourceHasEdge) {
        setShowAlert({show:true, message:'A node can only have one outgoing edge from its source handle!', status: 'error'});
        return;
      }
      
      setEdges((eds) => addEdge(params, eds));
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - 250,
        y: event.clientY - 100,
      };

      const newNode: Node = {
        id: `node_${Date.now()}`,
        type: 'textMessage',
        position,
        data: { label: 'Text Message' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setNodeText(node.data.label);
    setShowSettings(true);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setShowSettings(false);
  }, []);

  const updateNodeText = useCallback(() => {
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: nodeText,
            },
          };
        }
        return node;
      })
    );
  }, [selectedNode, nodeText, setNodes]);

  const handleSaveFlow = useCallback(() => {
    // Validation: Check for nodes with empty target handles (not connected as target)
    if (nodes.length === 0) {
      console.log(1)
      setShowAlert({show: true, message: 'Please add at least one node to the flow!', status: 'warning'});
      return;
    }

    if (nodes.length > 1) {
      const connectedTargets = new Set(edges.map((edge) => edge.target));
      const nodesWithoutIncoming = nodes.filter(
        (node) => !connectedTargets.has(node.id)
      );

      if (nodesWithoutIncoming.length > 1) {
        setShowAlert({show:true, message:'Error: More than one node has empty target handles. Please connect all nodes properly!', status: 'error'});
        return;
      }
    }

    setShowAlert({show:true, message:'Flow saved successfully', status: 'success' });
    console.log('Saved Flow:', { nodes, edges });
  }, [nodes, edges]);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  
  useEffect(() => {
    updateNodeText()
  }, [nodeText])

  return (
    <div className="h-screen flex flex-col bg-gray-50">      

      <Header handleSaveFlow={handleSaveFlow} />

      <div className="flex-1 flex">
        {/* Main Canvas */}
        <div className="flex-1" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-[#F9F5F0]"
          >
            {/* <Background color="#F9F5F0" gap={16} /> */}
            <Controls />
            <MiniMap
              nodeColor={() => {
                return '#06b6d4';
              }}
              className="bg-white border border-gray-200"
            />
          </ReactFlow>
        </div>

        {/* Right Sidebar - Nodes Panel or Settings */}
        <div className="w-80 bg-[#F2EAD3] border-l border-[#F4991A68] overflow-y-auto">
          {showSettings && selectedNode ? (
            // Settings Panel    
            <SettingsPanel
              selectedNode={selectedNode}
              nodeText={nodeText}
              setShowSettings={setShowSettings}
              setSelectedNode={setSelectedNode} 
              setNodeText={setNodeText}
              updateNodeText={updateNodeText}
            />
          ) : (
            // Nodes Panel
            <NodesPanel onDragStart={onDragStart} />
          )}
        </div>

        <CustomSnackbar showAlert={showAlert} setShowAlert={setShowAlert} />
      </div>
    </div>
  );
}