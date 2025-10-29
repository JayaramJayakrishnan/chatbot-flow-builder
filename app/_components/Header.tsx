import { Save } from "lucide-react";

const Header = ({ handleSaveFlow }: { handleSaveFlow: any }) => (
  <div className="bg-[#F2EAD3] border-b border-[#F4991A68] px-6 py-3 flex items-center justify-between shadow-lg">
    <h1 className="text-xl font-medium text-[#344F1F] tracking-tight hover:text-[#F4991A] transition-all duration-500">
      Chatbot Flow Builder
    </h1>
    <button
      onClick={handleSaveFlow}
      className="flex items-center gap-2 bg-[#F9F5F0] border-[#F4991A] px-4 hover:text-[#344F1F] hover:bg-[#F4991A68] 
        py-2 rounded-xl font-medium cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500"
    >
      <Save size={18} />
      Save Changes
    </button>
  </div>
);

export default Header;
