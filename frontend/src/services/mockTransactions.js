import { v4 as uuidv4 } from 'uuid';

const MERCHANTS = ['Amazon', 'Uber', 'Zomato', 'Swiggy', 'Netflix', 'Apple', 'Google Cloud', 'Steam', 'DoorDash', 'Walmart'];
const STATUSES = ['approved', 'approved', 'approved', 'hold', 'blocked', 'flagged'];
const CATEGORIES = ['shopping', 'food', 'entertainment', 'transport', 'utilities'];

export const generateMockTransactions = (count = 50) => {
    return Array.from({ length: count }, () => {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 30));

        return {
            id: uuidv4(),
            merchant: MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)],
            amount: Math.floor(Math.random() * 10000) + 100,
            status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
            risk_score: Math.floor(Math.random() * 100),
            category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
            timestamp: date.toISOString(),
            device_id: uuidv4(),
            history: Array.from({ length: 10 }, () => ({ value: Math.random() * 100 }))
        };
    });
};

export const mockTransactions = generateMockTransactions(100);

export const fetchMockTransactions = async (filters = {}) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filtered = [...mockTransactions];

            if (filters.search) {
                const q = filters.search.toLowerCase();
                filtered = filtered.filter(t =>
                    t.merchant.toLowerCase().includes(q) ||
                    t.id.includes(q)
                );
            }

            if (filters.status) {
                filtered = filtered.filter(t => t.status === filters.status);
            }

            if (filters.riskMin) {
                filtered = filtered.filter(t => t.risk_score >= parseInt(filters.riskMin));
            }
            if (filters.riskMax) {
                filtered = filtered.filter(t => t.risk_score <= parseInt(filters.riskMax));
            }

            // Sort
            if (filters.sortBy) {
                filtered.sort((a, b) => {
                    let valA = a[filters.sortBy];
                    let valB = b[filters.sortBy];
                    if (filters.sortBy === 'timestamp') {
                        valA = new Date(valA).getTime();
                        valB = new Date(valB).getTime();
                    }
                    if (valA < valB) return filters.sortOrder === 'asc' ? -1 : 1;
                    if (valA > valB) return filters.sortOrder === 'asc' ? 1 : -1;
                    return 0;
                });
            } else {
                // Default sort by date desc
                filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            }

            // Pagination
            const page = filters.page || 1;
            const limit = filters.limit || 10;
            const start = (page - 1) * limit;
            const paginated = filtered.slice(start, start + limit);

            resolve({
                transactions: paginated,
                total: filtered.length,
                page,
                limit,
                totalPages: Math.ceil(filtered.length / limit)
            });
        }, 600); // Simulate network delay
    });
};
