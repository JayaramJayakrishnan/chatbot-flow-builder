import { Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import { MessageCircleMore } from "lucide-react";

const TextMessageNode = ({
  data,
  selected,
}: {
  data: any;
  selected: boolean;
}) => {
  return (
    <div
      className={`bg-[#F2EAD3] rounded-xl ring shadow-lg transition-all duration-500 ${
        selected
          ? "ring-2 ring-[#F4991A] shadow-[#f4991a81]"
          : "ring ring-[#F4991A68]"
      } min-w-[200px]`}
    >
      {/* Target Handle (left side - where connections come IN) */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2! h-2! bg-gray-500! border border-[#F9F5F0]"
      />

      <div className="bg-[#344F1F] px-2 py-3 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MessageCircleMore color="#F2EAD3" size={22} />
          <span className="text-[#F2EAD3]">Send Message</span>
        </div>
      </div>
      <div className="p-3 min-h-12">
        <p className="text-sm text-[#344F1F] whitespace-pre-wrap">
          {data.label}
        </p>
      </div>

      {/* Source Handle (right side - where connections go OUT) */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-2! h-2! bg-teal-600! border border-[#F9F5F0]!"
      />
    </div>
  );
};

export default TextMessageNode;
