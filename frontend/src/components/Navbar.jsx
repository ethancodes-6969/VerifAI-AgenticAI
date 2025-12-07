import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import logo from '../assets/logo.png';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border-subtle">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-[1px]">
                        <div className="p-0.5 rounded-lg">
                            <img src={logo} alt="VerifAI Logo" className="h-10 w-auto" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-xl text-primary tracking-tight leading-none">VerifAI</span>
                            <span className="text-[10px] text-primary/80 font-medium tracking-wide leading-none">Banking Fraud Detection</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/features" className="text-text-muted hover:text-primary transition-colors font-medium">Features</Link>
                        <Link to="/pricing" className="text-text-muted hover:text-primary transition-colors font-medium">Pricing</Link>
                        <Link to="/about" className="text-text-muted hover:text-primary transition-colors font-medium">About</Link>
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
            </div>
        </nav>
    );
};

export default Navbar;
