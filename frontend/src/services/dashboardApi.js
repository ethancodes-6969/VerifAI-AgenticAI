import { MOCK_TRANSACTIONS, MOCK_STATS } from '../data/mockData';
import api from './api'; // Use the real Axios instance for auth/user calls

// Mock delay to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dashboardApi = {
    fetchDashboardStats: async () => {
        await delay(600);
        return MOCK_STATS;
    },

    fetchTransactions: async (page = 1, limit = 10, filters = {}) => {
        await delay(500);
        let data = [...MOCK_TRANSACTIONS];

        // Client-side filtering simulation
        if (filters.search) {
            const q = filters.search.toLowerCase();
            data = data.filter(t => t.merchant.toLowerCase().includes(q));
        }
        if (filters.status && filters.status !== 'ALL') {
            data = data.filter(t => t.status === filters.status);
        }

        const total = data.length;
        const start = (page - 1) * limit;
        const paginatedData = data.slice(start, start + limit);

        return {
            data: paginatedData,
            pagination: {
                current_page: page,
                total_pages: Math.ceil(total / limit),
                total_items: total,
                has_next: start + limit < total
            }
        };
    },

    takeAction: async (transactionId, action) => {
        await delay(300);
        // In a real app, this would hit PUT /api/transactions/:id/action
        return { success: true, message: `Transaction ${action.toLowerCase()} successfully` };
    },

    fetchRiskDistribution: async () => {
        await delay(400);
        return [
            { name: '0-20', value: 35 },
            { name: '20-40', value: 25 },
            { name: '40-60', value: 20 },
            { name: '60-80', value: 15 },
            { name: '80-100', value: 5 },
        ];
    }
};
