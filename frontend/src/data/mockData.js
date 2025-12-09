import { v4 as uuidv4 } from 'uuid';

const MERCHANTS = ['Amazon', 'Uber', 'Netflix', 'Starbucks', 'Apple Store', 'Walmart', 'Airbnb', 'Spotify', 'Doordash', 'Target'];
const CATEGORIES = ['Shopping', 'Transport', 'Entertainment', 'Food', 'Electronics', 'Grocery', 'Travel'];
const COUNTRIES = ['US', 'IN', 'GB', 'CA', 'AU', 'DE', 'JP'];
const STATUSES = ['APPROVED', 'BLOCKED', 'HOLD'];

// Generate deterministic random data
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateMockTransactions = (count = 50) => {
    return Array.from({ length: count }).map((_, i) => {
        const riskScore = getRandomInt(0, 100);
        // Correlate status with risk score for realism
        let status = 'APPROVED';
        if (riskScore >= 80) status = 'BLOCKED';
        else if (riskScore >= 50) status = 'HOLD';

        return {
            id: uuidv4(),
            merchant: getRandom(MERCHANTS),
            amount: getRandomInt(10, 5000),
            category: getRandom(CATEGORIES),
            risk_score: riskScore,
            status,
            timestamp: new Date(Date.now() - getRandomInt(0, 1000 * 60 * 60 * 24 * 7)).toISOString(), // Last 7 days
            device_id: uuidv4(),
            country: getRandom(COUNTRIES),
            ip_address: `192.168.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}`
        };
    }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const MOCK_TRANSACTIONS = generateMockTransactions(60);

export const MOCK_STATS = {
    total_transactions: 12450,
    blocked_today: 42,
    avg_risk_score: 24,
    active_devices: 3120
};
