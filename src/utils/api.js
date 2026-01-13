import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

// ==================== SUMMARY & ANALYTICS ====================
export const getSummary = async (accountId) => (await api.get('/summary', { params: { accountId } })).data;
export const getMonthlyAnalytics = async (months = 6) => (await api.get('/analytics/monthly', { params: { months } })).data;
export const getTrends = async () => (await api.get('/analytics/trends')).data;

// ==================== ACCOUNTS ====================
export const getAccounts = async () => (await api.get('/accounts')).data;
export const addAccount = async (data) => (await api.post('/accounts', data)).data;
export const updateAccount = async (id, data) => (await api.put(`/accounts/${id}`, data)).data;
export const deleteAccount = async (id) => (await api.delete(`/accounts/${id}`)).data;

// ==================== CATEGORIES ====================
export const getCategories = async (type) => (await api.get('/categories', { params: { type } })).data;
export const addCategory = async (data) => (await api.post('/categories', data)).data;
export const updateCategory = async (id, data) => (await api.put(`/categories/${id}`, data)).data;
export const deleteCategory = async (id) => (await api.delete(`/categories/${id}`)).data;

// ==================== TRANSACTIONS ====================
export const getTransactions = async (project, accountId, limit) => 
    (await api.get('/transactions', { params: { project, accountId, limit } })).data;
export const addTransaction = async (data) => (await api.post('/transactions', data)).data;
export const updateTransaction = async (id, data) => (await api.put(`/transactions/${id}`, data)).data;
export const deleteTransaction = async (id) => (await api.delete(`/transactions/${id}`)).data;

// ==================== BUDGETS ====================
export const getBudgets = async (month) => (await api.get('/budgets', { params: { month } })).data;
export const addBudget = async (data) => (await api.post('/budgets', data)).data;
export const updateBudget = async (id, data) => (await api.put(`/budgets/${id}`, data)).data;
export const deleteBudget = async (id) => (await api.delete(`/budgets/${id}`)).data;

// ==================== PROJECTS (backward compatibility) ====================
export const getProjects = async () => (await api.get('/projects')).data;

export default api;
