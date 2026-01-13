import { useState, useEffect } from 'react';
import { 
  getSummary, getAccounts, getCategories, getTransactions, 
  addTransaction, deleteTransaction, updateTransaction,
  getBudgets, addBudget, getMonthlyAnalytics
} from './utils/api';
import { Trash2, Edit2 } from 'lucide-react';

import Sidebar from './components/Sidebar';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import TransactionModal from './components/TransactionModal';
import WalletSelector from './components/WalletSelector';
import BudgetTracker from './components/BudgetTracker';
import FAB from './components/FAB';

function App() {
  // State
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0, categories: {}, categoryDetails: [] });
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedView, setSelectedView] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);

  const initialFormState = {
    description: '',
    amount: '',
    type: 'expense',
    accountId: '',
    categoryId: '',
    project: 'General',
    category: '',
    date: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch data
  const fetchData = async () => {
    try {
      const [summaryData, accountsData, categoriesData, transactionsData, budgetsData, monthlyAnalytics] = await Promise.all([
        getSummary(selectedAccount),
        getAccounts(),
        getCategories(),
        getTransactions(null, selectedAccount, 10),
        getBudgets(new Date().toISOString().slice(0, 7)),
        getMonthlyAnalytics(6)
      ]);

      setSummary(summaryData);
      setAccounts(accountsData);
      setCategories(categoriesData);
      setTransactions(transactionsData);
      setBudgets(budgetsData);
      setMonthlyData(monthlyAnalytics);

      // Set default account for new transactions
      if (accountsData.length > 0 && !formData.accountId) {
        setFormData(prev => ({ ...prev, accountId: accountsData[0].id }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedAccount]);

  // Handlers
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    if (formData.id) {
      await updateTransaction(formData.id, transactionData);
    } else {
      await addTransaction(transactionData);
    }

    setFormData({ ...initialFormState, accountId: accounts[0]?.id || '' });
    setIsModalOpen(false);
    fetchData();
  };

  const handleEdit = (transaction) => {
    setFormData({
      ...transaction,
      amount: transaction.amount.toString()
    });
    setIsModalOpen(true);
  };

  const handleOpenModal = () => {
    setFormData({ ...initialFormState, accountId: accounts[0]?.id || '' });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('คุณต้องการลบรายการนี้หรือไม่?')) {
      await deleteTransaction(id);
      fetchData();
    }
  };

  const handleAddBudget = () => {
    // TODO: Open budget modal
    alert('ฟีเจอร์เพิ่มงบประมาณจะมาเร็วๆ นี้!');
  };

  // Prepare pie chart data
  const pieData = (summary.categoryDetails || []).map(cat => ({
    name: cat.name,
    value: cat.amount,
    icon: cat.icon,
    color: cat.color
  }));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-slate-900 flex font-sans text-slate-900 dark:text-white transition-colors duration-300`}>
      <Sidebar
        selectedView={selectedView}
        onSelectView={setSelectedView}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <main className="max-w-6xl mx-auto p-6 md:p-8">
          {/* Header */}
          <header className="mb-8 pl-12 md:pl-0">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {selectedView === 'dashboard' && '📊 ภาพรวมการเงิน'}
              {selectedView === 'wallets' && '💳 จัดการบัญชี'}
              {selectedView === 'budgets' && '💰 งบประมาณ'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {new Date().toLocaleDateString('th-TH', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </header>

          {selectedView === 'dashboard' && (
            <>
              {/* Wallet Cards */}
              <WalletSelector
                accounts={accounts}
                selectedAccount={selectedAccount}
                onSelect={setSelectedAccount}
                onAddNew={() => alert('เพิ่มบัญชีใหม่ - Coming soon!')}
              />

              <div className="mt-8">
                <SummaryCards summary={summary} />
              </div>

              <Charts 
                summary={summary} 
                pieData={pieData} 
                monthlyData={monthlyData}
              />

              {/* Budget Tracker */}
              <div className="mb-8">
                <BudgetTracker budgets={budgets} onAddBudget={handleAddBudget} />
              </div>

              {/* Recent Transactions */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">
                    📝 ธุรกรรมล่าสุด
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700/50">
                      <tr className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        <th className="py-3 px-5">วันที่</th>
                        <th className="py-3 px-5">รายละเอียด</th>
                        <th className="py-3 px-5">หมวด</th>
                        <th className="py-3 px-5">บัญชี</th>
                        <th className="py-3 px-5 text-right">จำนวน</th>
                        <th className="py-3 px-5 text-right">จัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                      {transactions.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-12 text-slate-400">
                            <p className="text-4xl mb-2">📭</p>
                            <p>ยังไม่มีธุรกรรม</p>
                            <p className="text-sm mt-1">กดปุ่ม + เพื่อเพิ่มรายการแรก</p>
                          </td>
                        </tr>
                      ) : transactions.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="py-4 px-5 text-slate-500 dark:text-slate-400 text-sm">{t.date}</td>
                          <td className="py-4 px-5 font-medium text-slate-900 dark:text-white">{t.description}</td>
                          <td className="py-4 px-5">
                            <span className="inline-flex items-center gap-1.5 text-sm">
                              <span>{t.categoryIcon || '📦'}</span>
                              <span className="text-slate-600 dark:text-slate-300">{t.categoryName || t.category}</span>
                            </span>
                          </td>
                          <td className="py-4 px-5">
                            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                              <span>{t.accountIcon || '💵'}</span>
                              {t.accountName || 'เงินสด'}
                            </span>
                          </td>
                          <td className={`py-4 px-5 text-right font-bold ${
                            t.type === 'income' 
                              ? 'text-emerald-600 dark:text-emerald-400' 
                              : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            {t.type === 'expense' ? '-' : '+'}{formatCurrency(t.amount)}
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button 
                              onClick={() => handleEdit(t)} 
                              className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 rounded-lg mr-1"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(t.id)} 
                              className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-lg"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {selectedView === 'wallets' && (
            <WalletSelector
              accounts={accounts}
              selectedAccount={selectedAccount}
              onSelect={setSelectedAccount}
              onAddNew={() => alert('เพิ่มบัญชีใหม่ - Coming soon!')}
            />
          )}

          {selectedView === 'budgets' && (
            <BudgetTracker budgets={budgets} onAddBudget={handleAddBudget} />
          )}
        </main>
      </div>

      {/* FAB */}
      <FAB onClick={handleOpenModal} />

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        accounts={accounts}
        categories={categories}
      />
    </div>
  );
}

export default App;
