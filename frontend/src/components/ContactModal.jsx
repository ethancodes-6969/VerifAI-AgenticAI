import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle, User, Building, FileText, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import api from '../services/api';

const ContactModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [requirement, setRequirement] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await api.post('/demo/request', {
                email,
                role: role || 'Not Specified',
                name,
                company,
                requirement
            });
            setStatus('success');
            // Reset form
            setEmail('');
            setName('');
            setCompany('');
            setRequirement('');
            setRole('');

            setTimeout(() => {
                onClose();
                setStatus(null);
            }, 3000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] transition-opacity" // Higher z-index than slideshow
                onClick={onClose}
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl p-6 pointer-events-auto border border-white/10 max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-text-primary">Request a Demo</h3>
                        <button onClick={onClose}><X size={20} className="text-text-muted hover:text-text-primary" /></button>
                    </div>

                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/30">
                            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4">
                                <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h4 className="text-lg font-bold text-green-800 dark:text-green-300 mb-2">Request Sent!</h4>
                            <p className="text-green-700 dark:text-green-400/80 px-6">
                                We've received your request. Our team will contact you shortly.
                            </p>
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-text-muted" size={18} />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Work Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-text-muted" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@company.com"
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Company */}
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Company Name</label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-2.5 text-text-muted" size={18} />
                                    <input
                                        type="text"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder="Acme Corp"
                                        required
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="risk-manager">Risk Manager</option>
                                    <option value="developer">Developer</option>
                                    <option value="executive">Executive</option>
                                    <option value="product-manager">Product Manager</option>
                                    <option value="risk-manager">Risk Manager</option>
                                    <option value="fraud-analyst">Fraud Analyst</option>
                                    <option value="compliance-officer">Compliance Officer</option>
                                    <option value="aml-specialist">AML Specialist</option>
                                    <option value="kyc-analyst">KYC Analyst</option>
                                    <option value="security-engineer">Security Engineer</option>
                                    <option value="backend-engineer">Backend Engineer</option>
                                    <option value="frontend-engineer">Frontend Engineer</option>
                                    <option value="full-stack-developer">Full-Stack Developer</option>
                                    <option value="data-scientist">Data Scientist</option>
                                    <option value="machine-learning-engineer">Machine Learning Engineer</option>
                                    <option value="data-analyst">Data Analyst</option>
                                    <option value="technical-program-manager">Technical Program Manager</option>
                                    <option value="engineering-manager">Engineering Manager</option>
                                    <option value="cto">CTO</option>
                                    <option value="ciso">CISO</option>
                                    <option value="executive">Executive</option>
                                    <option value="fintech-founder">Fintech Founder</option>
                                    <option value="operations-manager">Operations Manager</option>
                                    <option value="customer-success-manager">Customer Success Manager</option>
                                    <option value="qa-engineer">QA Engineer</option>
                                    <option value="devops-engineer">DevOps Engineer</option>
                                    <option value="cloud-architect">Cloud Architect</option>
                                    <option value="integration-engineer">Integration Engineer</option>
                                    <option value="api-developer">API Developer</option>
                                    <option value="business-analyst">Business Analyst</option>
                                    <option value="payments-specialist">Payments Specialist</option>
                                    <option value="banking-operations">Banking Operations</option>
                                    <option value="support-engineer">Support Engineer</option>
                                    <option value="research-intern">Research Intern</option>
                                    <option value="student-learning">Student / Learning</option>
                                    <option value="other">Other</option>

                                </select>
                            </div>

                            {/* Requirement */}
                            <div>
                                <label className="block text-sm font-medium text-text-muted mb-1">Requirements</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 text-text-muted" size={18} />
                                    <textarea
                                        value={requirement}
                                        onChange={(e) => setRequirement(e.target.value)}
                                        placeholder="Tell us about your needs..."
                                        rows={3}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-border-subtle focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/30">
                                    <AlertCircle size={16} />
                                    <span>Failed to send request. Please try again.</span>
                                </div>
                            )}

                            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white h-12 text-base shadow-lg shadow-primary/25 mt-2" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </span>
                                ) : (
                                    "Submit Request"
                                )}
                            </Button>
                        </form>
                    )}
                </motion.div>
            </div>
        </React.Fragment>
    );
};

export default ContactModal;
