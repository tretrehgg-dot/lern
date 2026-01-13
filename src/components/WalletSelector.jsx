import { Wallet, Plus, MoreHorizontal } from 'lucide-react';

export default function WalletSelector({ accounts, selectedAccount, onSelect, onAddNew }) {
  const totalBalance = accounts.reduce((sum, acc) => sum + (acc.currentBalance || 0), 0);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      {/* Total Balance Card */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-6 text-white shadow-xl shadow-indigo-500/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Wallet size={20} />
            </div>
            <span className="text-white/80 text-sm font-medium">ยอดเงินรวมทั้งหมด</span>
          </div>
        </div>
        <div className="text-4xl font-bold tracking-tight">
          {formatCurrency(totalBalance)}
        </div>
        <div className="text-white/60 text-sm mt-2">
          {accounts.length} บัญชี
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => onSelect(account.id === selectedAccount ? null : account.id)}
            className={`group relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
              selectedAccount === account.id
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
                : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 bg-white dark:bg-slate-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: account.color + '20' }}
              >
                {account.icon}
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                account.type === 'cash' ? 'bg-emerald-100 text-emerald-700' :
                account.type === 'bank' ? 'bg-blue-100 text-blue-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {account.type === 'cash' ? 'เงินสด' : 
                 account.type === 'bank' ? 'ธนาคาร' : 'บัตรเครดิต'}
              </span>
            </div>
            
            <div className="mt-3">
              <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {account.name}
              </div>
              <div className={`text-xl font-bold mt-1 ${
                (account.currentBalance || 0) >= 0 
                  ? 'text-slate-900 dark:text-white' 
                  : 'text-rose-600'
              }`}>
                {formatCurrency(account.currentBalance || 0)}
              </div>
            </div>

            {selectedAccount === account.id && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        ))}

        {/* Add New Account Button */}
        <button
          onClick={onAddNew}
          className="p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-indigo-600"
        >
          <Plus size={24} />
          <span className="text-sm font-medium">เพิ่มบัญชี</span>
        </button>
      </div>
    </div>
  );
}
