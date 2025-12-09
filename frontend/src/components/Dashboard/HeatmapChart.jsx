import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

const HeatmapChart = ({ data }) => {
    // Gradient colors based on risk severity
    const getBarColor = (index) => {
        if (index >= 4) return '#ef4444'; // Red for 80-100
        if (index >= 2) return '#f59e0b'; // Orange for 40-80
        return '#10b981'; // Green for 0-40
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-border-subtle">
                    <p className="font-semibold text-text-primary mb-1">Risk Range: {label}</p>
                    <p className="text-sm text-text-muted">
                        Transactions: <span className="font-bold text-primary">{payload[0].value}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-border-subtle h-[350px]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-text-primary">Risk Score Distribution</h3>
                <select className="text-sm bg-gray-100 dark:bg-white/5 border-none rounded-lg px-3 py-1 text-text-muted cursor-pointer hover:text-primary focus:ring-0">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                </select>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={50}>
                            {data && data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HeatmapChart;
