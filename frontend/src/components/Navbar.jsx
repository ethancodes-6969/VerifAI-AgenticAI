import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';

const Navbar = () => {
    const triggerRipple = (e) => {
        const ripple = e.currentTarget.querySelector(".ripple");
        if (!ripple) return;
        ripple.classList.remove("ripple-active");
        // force reflow
        // eslint-disable-next-line no-unused-expressions
        ripple.offsetWidth;
        ripple.classList.add("ripple-active");
        setTimeout(() => ripple.classList.remove("ripple-active"), 500);
    };

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-md border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="group inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-md p-1 -ml-1 transition-all"
                    aria-label="Go to VerifAI homepage"
                    onClick={triggerRipple}
                >
                    <motion.div
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative"
                    >
                        <span aria-hidden="true" className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 logo-glow -z-10"></span>
                        <img src={logo} alt="VerifAI Logo" className="h-10 sm:h-12 w-auto object-contain rounded-md drop-shadow-sm" />
                        <span className="ripple absolute inset-0 rounded-md pointer-events-none"></span>
                    </motion.div>

                    <motion.div
                        whileHover={{ x: 2 }}
                        transition={{ duration: 0.18 }}
                        className="flex flex-col leading-none"
                    >
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary transition-all duration-200 group-hover:brightness-125">VerifAI</span>
                        <span className="text-[10px] text-text-muted font-medium hidden sm:inline">Fraud Detection</span>
                    </motion.div>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
                    <Link to="/features" className="hover:text-primary transition-colors">Features</Link>
                    <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/auth?view=login">
                        <Button variant="ghost" size="sm">Log In</Button>
                    </Link>
                    <Link to="/auth?view=signup">
                        <Button variant="primary" size="sm">Get Started</Button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
