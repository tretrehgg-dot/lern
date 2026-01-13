import { AlertCircle, TrendingUp } from 'lucide-react';

export default function BudgetTracker({ budgets, onAddBudget }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-rose-500';
    if (percentage >= 80) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const getProgressBgColor = (percentage) => {
    if (percentage >= 100) return 'bg-rose-100 dark:bg-rose-500/20';
    if (percentage >= 80) return 'bg-amber-100 dark:bg-amber-500/20';
    return 'bg-emerald-100 dark:bg-emerald-500/20';
  };

  if (budgets.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2">
            <TrendingUp size={20} className="text-indigo-500" />
            งบประมาณเดือนนี้
          </h3>
        </div>
        <div className="text-center py-8 text-slate-400">
          <p className="mb-4">ยังไม่มีการตั้งงบประมาณ</p>
          <button
            onClick={onAddBudget}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-sm font-medium transition-colors"
          >
            ตั้งงบประมาณ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 dark:text-white text-lg flex items-center gap-2">
          <TrendingUp size={20} className="text-indigo-500" />
          งบประมาณเดือนนี้
        </h3>
        <button
          onClick={onAddBudget}
          className="text-sm text-indigo-500 hover:text-indigo-600 font-medium"
        >
          + เพิ่ม
        </button>
      </div>

      <div className="space-y-4">
        {budgets.map((budget) => (
          <div key={budget.id} className="group">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                  style={{ backgroundColor: (budget.categoryColor || '#64748b') + '20' }}
                >
                  {budget.categoryIcon || '📦'}
                </span>
                <div>
                  <span className="font-medium text-slate-800 dark:text-white text-sm">
                    {budget.categoryName || 'ไม่ระบุหมวด'}
                  </span>
                  {budget.percentage >= 80 && budget.percentage < 100 && (
                    <span className="ml-2 text-xs text-amber-600 bg-amber-100 dark:bg-amber-500/20 px-2 py-0.5 rounded-full">
                      ใกล้เต็ม
                    </span>
                  )}
                  {budget.percentage >= 100 && (
                    <span className="ml-2 text-xs text-rose-600 bg-rose-100 dark:bg-rose-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 inline-flex">
                      <AlertCircle size={12} />
                      เกินงบ
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${
                  budget.percentage >= 100 ? 'text-rose-600' : 'text-slate-800 dark:text-white'
                }`}>
                  {formatCurrency(budget.spent)}
                </span>
                <span className="text-slate-400 text-sm"> / {formatCurrency(budget.amount)}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className={`h-2 rounded-full overflow-hidden ${getProgressBgColor(budget.percentage)}`}>
              <div
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(budget.percentage)}`}
                style={{ width: `${Math.min(budget.percentage, 100)}%` }}
              />
            </div>

            {/* Remaining text */}
            <div className="flex justify-between mt-1.5 text-xs text-slate-400">
              <span>{Math.round(budget.percentage)}% ใช้ไป</span>
              <span>
                {budget.remaining >= 0 
                  ? `เหลือ ${formatCurrency(budget.remaining)}`
                  : `เกิน ${formatCurrency(Math.abs(budget.remaining))}`
                }
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
