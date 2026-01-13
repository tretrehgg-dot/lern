import { X, Wallet, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function TransactionModal({ 
    isOpen, 
    onClose, 
    onSubmit, 
    formData, 
    setFormData,
    accounts = [],
    categories = []
}) {
    if (!isOpen) return null;

    const expenseCategories = categories.filter(c => c.type === 'expense');
    const incomeCategories = categories.filter(c => c.type === 'income');
    const currentCategories = formData.type === 'expense' ? expenseCategories : incomeCategories;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 dark:border-slate-700">
                {/* Header */}
                <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {formData.id ? '✏️ แก้ไขรายการ' : '➕ เพิ่มรายการใหม่'}
                    </h3>
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-5 space-y-4">
                    {/* Type Toggle */}
                    <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-700 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'expense', categoryId: '' })}
                            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                                formData.type === 'expense'
                                    ? 'bg-rose-500 text-white shadow-lg'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                            }`}
                        >
                            💸 รายจ่าย
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, type: 'income', categoryId: '' })}
                            className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-all ${
                                formData.type === 'income'
                                    ? 'bg-emerald-500 text-white shadow-lg'
                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                            }`}
                        >
                            💰 รายรับ
                        </button>
                    </div>

                    {/* Account Selector */}
                    {accounts.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <Wallet size={14} className="inline mr-1" /> บัญชี
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {accounts.slice(0, 6).map(account => (
                                    <button
                                        key={account.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, accountId: account.id })}
                                        className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                                            formData.accountId === account.id
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/20'
                                                : 'border-slate-200 dark:border-slate-600 hover:border-indigo-300'
                                        }`}
                                    >
                                        <div className="text-xl mb-1">{account.icon}</div>
                                        <div className="text-xs text-slate-600 dark:text-slate-300 truncate">
                                            {account.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Category Selector */}
                    {currentCategories.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <Tag size={14} className="inline mr-1" /> หมวดหมู่
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {currentCategories.slice(0, 8).map(cat => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setFormData({ 
                                            ...formData, 
                                            categoryId: cat.id,
                                            category: cat.name 
                                        })}
                                        className={`p-2 rounded-xl border-2 text-center transition-all ${
                                            formData.categoryId === cat.id
                                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/20'
                                                : 'border-slate-200 dark:border-slate-600 hover:border-indigo-300'
                                        }`}
                                    >
                                        <div className="text-xl mb-0.5">{cat.icon}</div>
                                        <div className="text-xs text-slate-600 dark:text-slate-300 truncate">
                                            {cat.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Amount Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            จำนวนเงิน
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-3 text-slate-400 font-medium">฿</span>
                            <input
                                type="number"
                                value={formData.amount}
                                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                className="w-full pl-9 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-xl font-bold text-slate-900 dark:text-white"
                                placeholder="0"
                                required
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                วันที่
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700 dark:text-white"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                รายละเอียด
                            </label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-slate-700 dark:text-white"
                                placeholder="เช่น ค่าอาหาร"
                                required
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 font-medium rounded-xl transition-colors"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 px-4 py-3 text-white font-medium rounded-xl transition-all shadow-lg ${
                                formData.type === 'expense'
                                    ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30'
                                    : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'
                            }`}
                        >
                            {formData.id ? 'บันทึกการแก้ไข' : 'บันทึก'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
