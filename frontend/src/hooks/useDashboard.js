import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../services/dashboardApi';
import useAuthStore from '../stores/useAuthStore';

export const useDashboard = () => {
    const { user } = useAuthStore();

    // Stats State
    const [stats, setStats] = useState(null);
    const [heatmapData, setHeatmapData] = useState([]);
    const [statsLoading, setStatsLoading] = useState(true);

    // Transactions State
    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1, has_next: false });
    const [tableLoading, setTableLoading] = useState(true);

    // Filter State
    const [filters, setFilters] = useState({
        search: '',
        status: 'ALL'
    });

    const [page, setPage] = useState(1);

    // Fetch Stats
    useEffect(() => {
        const loadStats = async () => {
            setStatsLoading(true);
            try {
                const [statsData, riskData] = await Promise.all([
                    dashboardApi.fetchDashboardStats(),
                    dashboardApi.fetchRiskDistribution()
                ]);
                setStats(statsData);
                setHeatmapData(riskData);
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
            } finally {
                setStatsLoading(false);
            }
        };
        loadStats();
    }, []);

    // Fetch Transactions on filter/page change
    const refreshTransactions = useCallback(async () => {
        setTableLoading(true);
        try {
            const result = await dashboardApi.fetchTransactions(page, 10, filters);
            setTransactions(result.data);
            setPagination(result.pagination);
        } catch (error) {
            console.error(error);
        } finally {
            setTableLoading(false);
        }
    }, [page, filters]);

    useEffect(() => {
        refreshTransactions();
    }, [refreshTransactions]);

    // Handlers
    const handleSearch = (term) => {
        setFilters(prev => ({ ...prev, search: term }));
        setPage(1); // Reset to first page
    };

    const handleStatusFilter = (status) => {
        setFilters(prev => ({ ...prev, status }));
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleTransactionAction = async (id, action) => {
        await dashboardApi.takeAction(id, action);
        refreshTransactions(); // Reload table
    };

    return {
        user,
        stats,
        heatmapData,
        transactions,
        pagination,
        statsLoading,
        tableLoading,
        filters,
        handleSearch,
        handleStatusFilter,
        handlePageChange,
        handleTransactionAction
    };
};
