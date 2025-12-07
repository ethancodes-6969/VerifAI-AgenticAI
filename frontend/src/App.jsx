import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';

import AuthPage from './pages/AuthPage';
import { Navigate } from 'react-router-dom';

import GoogleCallback from './pages/GoogleCallback';
import ProtectedRoute from './components/ProtectedRoute';

// Placeholder components for routes not yet implemented
const Dashboard = () => <div className="p-20 text-center">Dashboard (Authenticated)</div>;

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="/login" element={<Navigate to="/auth?view=login" replace />} />
        <Route path="/signup" element={<Navigate to="/auth?view=signup" replace />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
