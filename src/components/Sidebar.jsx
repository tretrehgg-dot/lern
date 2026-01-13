import { Wallet, LayoutDashboard, PiggyBank, Settings, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ 
    selectedView = 'dashboard', 
    onSelectView,
    darkMode,
    onToggleDarkMode 
}) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const menuItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'ภาพรวม' },
        { id: 'wallets', icon: Wallet, label: 'บัญชี' },
        { id: 'budgets', icon: PiggyBank, label: 'งบประมาณ' },
    ];

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="p-6">
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Finance Tracker
                    </span>
                </h1>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-4 space-y-1 overflow-y-auto">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => {
                            onSelectView(item.id);
                            setIsMobileOpen(false);
                        }}
                        className={`w-full p-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-all duration-200 ${
                            selectedView === item.id 
                                ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shadow-sm' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                        }`}
                    >
                        <item.icon size={18} className={selectedView === item.id ? 'text-indigo-500' : ''} />
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div className="p-4 space-y-3">
                {/* Dark Mode Toggle */}
                <button
                    onClick={onToggleDarkMode}
                    className="w-full p-3 rounded-xl flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    {darkMode ? 'โหมดสว่าง' : 'โหมดมืด'}
                </button>

                {/* Tip Card */}
                <div className="p-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl text-white">
                    <p className="text-xs font-medium text-indigo-200 mb-1">💡 เคล็ดลับ</p>
                    <p className="text-sm">ลองตั้งงบประมาณเพื่อควบคุมค่าใช้จ่ายของคุณ</p>
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-4 left-4 z-40 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700"
            >
                <Menu size={24} className="text-slate-700 dark:text-white" />
            </button>

            {/* Desktop Sidebar */}
            <div className="w-64 bg-white dark:bg-slate-800 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
                <SidebarContent />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    <div 
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                        onClick={() => setIsMobileOpen(false)}
                    />
                    <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 shadow-2xl flex flex-col">
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
                        >
                            <X size={20} />
                        </button>
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    );
}
