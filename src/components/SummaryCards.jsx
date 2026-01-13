import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export default function SummaryCards({ summary }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Income Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group">
                <div className="flex justify-between items-start mb-3">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                        <TrendingUp size={22} />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-full">
                        <TrendingUp size={14} />
                        <span>รายรับ</span>
                    </div>
                </div>
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">รายรับทั้งหมด</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {formatCurrency(summary.income)}
                    </h3>
                </div>
            </div>

            {/* Expense Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group">
                <div className="flex justify-between items-start mb-3">
                    <div className="p-3 bg-rose-100 dark:bg-rose-500/20 rounded-xl text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                        <TrendingDown size={22} />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-rose-600 bg-rose-50 dark:bg-rose-500/10 px-2 py-1 rounded-full">
                        <TrendingDown size={14} />
                        <span>รายจ่าย</span>
                    </div>
                </div>
                <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">รายจ่ายทั้งหมด</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {formatCurrency(summary.expense)}
                    </h3>
                </div>
            </div>

            {/* Balance Card */}
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-5 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform duration-500">
                    <Wallet size={100} />
                </div>
                <div className="flex justify-between items-start mb-3 relative z-10">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <Wallet size={22} />
                    </div>
                </div>
                <div className="relative z-10">
                    <p className="text-white/70 text-sm font-medium mb-1">ยอดคงเหลือสุทธิ</p>
                    <h3 className="text-2xl font-bold tracking-tight">
                        {formatCurrency(summary.balance)}
                    </h3>
                </div>
            </div>
        </div>
    );
}
