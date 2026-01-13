import { Plus, X } from 'lucide-react';

export default function FAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-full shadow-2xl shadow-indigo-500/40 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="เพิ่มรายการใหม่"
    >
      <Plus 
        size={28} 
        className="transition-transform duration-300 group-hover:rotate-90" 
      />
      
      {/* Pulse animation ring */}
      <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-25"></span>
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 bg-slate-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        เพิ่มรายการ
      </span>
    </button>
  );
}
