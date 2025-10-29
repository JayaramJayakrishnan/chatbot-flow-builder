import React from "react";
import { Node } from "reactflow";
import { SquarePen, ChevronLeft } from "lucide-react";

const SettingsPanel = ({
  nodeText,
  selectedNode,
  setShowSettings,
  setSelectedNode,
  setNodeText,
  updateNodeText,
}: {
  nodeText: string;
  selectedNode: Node;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
  setNodeText: (text: string) => void;
  updateNodeText: () => void;
}) => (
  <div className="p-4">
    <div className="flex items-center justify-center gap-2 mb-8">
      <button
        onClick={() => {
          setShowSettings(false);
          setSelectedNode(null);
        }}
        className="p-1 hover:scale-110 rounded transition-all duration-500 cursor-pointer"
      >
        <ChevronLeft size={20} color="#1e2939"/>
      </button>
      <div className="flex items-center gap-2">
        <h2 className="text-md font-medium text-gray-800">Message Settings</h2>
        <SquarePen size={20} fill="#344F1F" color="#F2EAD3" />
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text
        </label>
        <textarea
          value={nodeText}
          onChange={(e) => {
            setNodeText(e.target.value);
          }}
          className="w-full px-3 py-2 bg-[#F9F5F0] text-gray-800 border border-[#344F1F] rounded-lg focus:inset-ring-3 focus:inset-ring-[#F4991A]/50 focus:border-transparent 
            resize-none transition-all duration-500 outline-0"
          rows={4}
          placeholder="Enter message text..."
        />
      </div>
      <div className="border-t border-gray-200">
        <p className="text-xs text-gray-500">Node ID: {selectedNode?.id}</p>
      </div>
    </div>
  </div>
);

export default SettingsPanel;
