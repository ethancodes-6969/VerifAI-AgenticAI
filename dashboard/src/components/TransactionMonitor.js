import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

export function TransactionMonitor() {
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    blocked: 0,
    approved: 0,
    avgRisk: 0
  });

  useEffect(() => {
    // Simulate transaction data
    const mockTransactions = [
      {
        id: 'tx_001',
        amount: 5000,
        merchant: 'Amazon',
        status: 'APPROVED',
        score: 0.15,
        time: new Date()
      },
      {
        id: 'tx_002',
        amount: 100000,
        merchant: 'Unknown Store',
        status: 'BLOCKED',
        score: 0.85,
        time: new Date()
      }
    ];
    
    setTransactions(mockTransactions);
    setStats({
      total: mockTransactions.length,
      blocked: mockTransactions.filter(t => t.status === 'BLOCKED').length,
      approved: mockTransactions.filter(t => t.status === 'APPROVED').length,
      avgRisk: (mockTransactions.reduce((a, b) => a + b.score, 0) / mockTransactions.length).toFixed(2)
    });
  }, []);

  return (
    <div className="dashboard">
      <h1>🛡️ VerifAI Transaction Monitor</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Transactions</p>
        </div>
        <div className="stat-card success">
          <h3>{stats.approved}</h3>
          <p>Approved ✅</p>
        </div>
        <div className="stat-card danger">
          <h3>{stats.blocked}</h3>
          <p>Blocked 🚫</p>
        </div>
        <div className="stat-card">
          <h3>{stats.avgRisk}</h3>
          <p>Avg Risk Score</p>
        </div>
      </div>

      <div className="transactions-list">
        <h2>Recent Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Merchant</th>
              <th>Fraud Score</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className={tx.status.toLowerCase()}>
                <td>{tx.id}</td>
                <td>₹{tx.amount.toLocaleString()}</td>
                <td>{tx.merchant}</td>
                <td>
                  <span className={`badge ${tx.score > 0.5 ? 'danger' : 'success'}`}>
                    {(tx.score * 100).toFixed(1)}%
                  </span>
                </td>
                <td>{tx.status}</td>
                <td>{tx.time.toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionMonitor;
