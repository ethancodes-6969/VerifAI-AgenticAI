import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const TransactionSparkline = ({ data, color = "#1FA8A8" }) => {
    // If no data, show a flat line or simple placeholder
    const chartData = data?.length > 0
        ? data
        : Array.from({ length: 10 }, (_, i) => ({ value: 50 + Math.random() * 20 }));

    return (
        <div style={{ width: 60, height: 30 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        fill={color}
                        fillOpacity={0.2}
                        strokeWidth={2}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TransactionSparkline;
