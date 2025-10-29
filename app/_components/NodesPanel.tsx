import { Workflow , MessageCircleMore } from 'lucide-react';

const NodesPanel = ({onDragStart} : {onDragStart: (event: React.DragEvent, nodeType: string) => void}) => (
    <div className="p-4">
        <h2 className="text-md font-medium text-gray-800 mb-8 flex items-center justify-center gap-2">
            <Workflow size={20} fill='#344F1F' color='#344F1F'/>
            Nodes Panel
        </h2>
        <div className="space-y-3">
        <div
            draggable
            onDragStart={(e) => onDragStart(e, 'textMessage')}
            className="bg-[#F9F5F0] border-2 border-[#344F1F] rounded-lg p-4 cursor-move hover:shadow-lg transition-all duration-500"
        >
            <div className="flex flex-col items-center gap-2 text-[#344F1F]">
            <MessageCircleMore fill='#344F1F' color='#F2EAD3' size={24} />
            <span className="text-sm font-medium">Message</span>
            </div>
        </div>
        <p className="text-xs text-gray-800 mt-3">
            Drag and drop nodes to the canvas to create your chatbot flow
        </p>
        </div>
    </div>
)

export default NodesPanel

