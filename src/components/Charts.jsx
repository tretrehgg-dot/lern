import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function Charts({ summary, pieData, monthlyData = [] }) {
    const COLORS = ['#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#6366f1', '#64748b'];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency',
            currency: 'THB',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-800 text-white px-4 py-2 rounded-xl shadow-lg">
                    <p className="font-medium">{payload[0].name || payload[0].dataKey}</p>
                    <p className="text-lg font-bold">{formatCurrency(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Category Breakdown Pie Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 h-96">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">
                    📊 สัดส่วนค่าใช้จ่ายเดือนนี้
                </h3>
                {pieData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-400">
                        <p>ยังไม่มีข้อมูลค่าใช้จ่าย</p>
                    </div>
                ) : (
                    <div className="flex h-[85%]">
                        <ResponsiveContainer width="60%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={85}
                                    paddingAngle={3}
                                    dataKey="value"
                                    cornerRadius={4}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.color || COLORS[index % COLORS.length]} 
                                            stroke="none" 
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        
                        {/* Legend */}
                        <div className="flex-1 flex flex-col justify-center space-y-2 overflow-y-auto">
                            {pieData.slice(0, 6).map((item, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                    <div 
                                        className="w-3 h-3 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: item.color || COLORS[index % COLORS.length] }}
                                    />
                                    <span className="text-slate-600 dark:text-slate-300 truncate flex-1">
                                        {item.icon} {item.name}
                                    </span>
                                    <span className="font-medium text-slate-800 dark:text-white">
                                        {Math.round((item.value / pieData.reduce((a, b) => a + b.value, 0)) * 100)}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Trend Line Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 h-96">
                <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">
                    📈 แนวโน้มรายเดือน
                </h3>
                {monthlyData.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-400">
                        <p>ยังไม่มีข้อมูลเพียงพอ</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="85%">
                        <AreaChart data={monthlyData}>
                            <defs>
                                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis 
                                dataKey="monthLabel" 
                                stroke="#94a3b8" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                            />
                            <YAxis 
                                stroke="#94a3b8" 
                                fontSize={12} 
                                tickLine={false} 
                                axisLine={false}
                                tickFormatter={(value) => `฿${(value/1000).toFixed(0)}k`}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend iconType="circle" />
                            <Area 
                                type="monotone" 
                                dataKey="income" 
                                name="รายรับ"
                                stroke="#10b981" 
                                strokeWidth={2}
                                fill="url(#incomeGradient)"
                            />
                            <Area 
                                type="monotone" 
                                dataKey="expense" 
                                name="รายจ่าย"
                                stroke="#f43f5e" 
                                strokeWidth={2}
                                fill="url(#expenseGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
