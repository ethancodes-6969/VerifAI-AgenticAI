import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { ShieldCheck, Mail, Smartphone, Fingerprint, ArrowRight, Chrome } from 'lucide-react';
import Navbar from '../components/Navbar';
import { AuthInput, PasswordInput, SocialButton } from '../components/auth/AuthComponents';
import { Button } from '../components/ui/Button';
import useAuth from '../hooks/useAuth';

// --- Validation Schemas ---
const loginSchema = z.object({
    identifier: z.string().min(1, 'Email or Phone is required'),
    password: z.string().min(1, 'Password is required'),
});

const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().regex(/^\+?[\d\s-]{10,15}$/, 'Phone number is required and must be valid'),
    password: z.string().min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Must contain at least one number'),
    confirmPassword: z.string(),
    terms: z.boolean().refine(val => val === true, 'You must accept the terms and privacy policy'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const AuthPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login, signup, isLoading } = useAuth();

    // Determine view from URL or default to login
    const initialView = searchParams.get('view');
    const [isLogin, setIsLogin] = useState(initialView !== 'signup');

    // Sync state with URL
    useEffect(() => {
        const currentView = searchParams.get('view');
        if (currentView === 'signup' && isLogin) setIsLogin(false);
        if (currentView === 'login' && !isLogin) setIsLogin(true);
    }, [searchParams]);

    const toggleView = (loginState) => {
        setIsLogin(loginState);
        setSearchParams({ view: loginState ? 'login' : 'signup' });
    };

    // --- Forms ---
    const {
        register: loginRegister,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors, isSubmitting: isLoginSubmitting }
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const {
        register: signupRegister,
        handleSubmit: handleSignupSubmit,
        watch,
        formState: { errors: signupErrors, isSubmitting: isSignupSubmitting }
    } = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: { terms: false }
    });

    const passwordValue = watch('password', '');

    // Password Strength Calc
    const getPasswordStrength = (pass) => {
        if (!pass) return 0;
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;
        return score;
    };
    const strength = getPasswordStrength(passwordValue);

    // --- Handlers ---
    const onLogin = async (data) => {
        try {
            await login(data.identifier, data.password);
            toast.success('Welcome back!');
            navigate('/dashboard');
        } catch (error) {
            // Error handled by store setting state or internal throw, shown here via toast
            toast.error(error.response?.data?.detail || 'Invalid credentials');
        }
    };

    const onSignup = async (data) => {
        try {
            // payload structure matches what store/backend expects
            await signup({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            });
            toast.success('Account created successfully!');
            // If signup automatically logs in (based on store logic), redirect
            // checking store auth state might be needed or just wait for effect
            // assuming explicit login required or handling it:
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Signup failed');
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to backend Google auth endpoint
        window.location.href = 'http://localhost:8001/api/auth/google/login';
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            <Navbar />

            {/* Background Gradients */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-secondary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <div className="flex-1 flex items-center justify-center p-4 pt-20">
                <div className="w-full max-w-[1000px] h-[650px] md:h-[700px] bg-white/20 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">

                    <div className="flex-1 relative overflow-hidden w-full">
                        <motion.div
                            className="flex h-full w-[200%]"
                            animate={{ x: isLogin ? "0%" : "-50%" }}
                            transition={{ duration: 0.5, ease: "anticipate" }}
                        >

                            {/* LOGIN PANEL */}
                            <div className="w-1/2 h-full p-6 md:p-12 overflow-y-auto flex flex-col justify-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: isLogin ? 1 : 0, y: isLogin ? 0 : 10 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className="max-w-md mx-auto w-full space-y-8"
                                >
                                    <div className="text-center space-y-2">
                                        <h2 className="text-3xl font-bold text-primary text-sheen">Welcome Back</h2>
                                        <p className="text-text-muted">Sign in to your fraud detection dashboard</p>
                                    </div>

                                    <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-5">
                                        <AuthInput
                                            label="Email or Phone"
                                            placeholder="you@company.com"
                                            {...loginRegister('identifier')}
                                            error={loginErrors.identifier}
                                        />
                                        <div className="space-y-1">
                                            <PasswordInput
                                                label="Password"
                                                placeholder="••••••••"
                                                {...loginRegister('password')}
                                                error={loginErrors.password}
                                            />
                                            <div className="flex justify-end">
                                                <button type="button" className="text-xs text-secondary hover:text-secondary-dark font-medium transition-colors">
                                                    Forgot Password?
                                                </button>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isLoginSubmitting || isLoading}
                                            className="w-full py-3 text-lg font-semibold bg-primary hover:bg-primary-light shadow-lg hover:shadow-primary/20 btn-strong-shadow"
                                        >
                                            {isLoading && isLogin ? 'Signing In...' : 'Sign In'}
                                        </Button>
                                    </form>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-border-subtle" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white/40 backdrop-blur-sm px-2 text-text-muted">Or continue with</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <SocialButton onClick={handleGoogleLogin} icon={Chrome}>
                                            Google
                                        </SocialButton>
                                        <SocialButton onClick={() => toast('Aadhaar Login Clicked')} icon={Fingerprint}>
                                            Aadhaar
                                        </SocialButton>
                                    </div>

                                    <p className="text-center text-sm text-text-muted">
                                        Don’t have an account?{' '}
                                        <button
                                            onClick={() => toggleView(false)}
                                            className="font-semibold text-secondary hover:underline cursor-pointer"
                                        >
                                            Sign Up
                                        </button>
                                    </p>
                                </motion.div>
                            </div>

                            {/* SIGNUP PANEL */}
                            <div className="w-1/2 h-full p-6 md:p-12 overflow-y-auto flex flex-col justify-center bg-white/10">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: !isLogin ? 1 : 0, y: !isLogin ? 0 : 10 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                    className="max-w-md mx-auto w-full space-y-6"
                                >
                                    <div className="text-center space-y-2">
                                        <h2 className="text-3xl font-bold text-primary text-sheen">Create Account</h2>
                                        <p className="text-text-muted">Get started with VerifAI protection today</p>
                                    </div>

                                    <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4">
                                        <AuthInput
                                            label="Full Name"
                                            placeholder="John Doe"
                                            {...signupRegister('name')}
                                            error={signupErrors.name}
                                        />
                                        <AuthInput
                                            label="Email Address"
                                            type="email"
                                            placeholder="you@company.com"
                                            {...signupRegister('email')}
                                            error={signupErrors.email}
                                        />
                                        <AuthInput
                                            label="Phone Number"
                                            placeholder="+91 98765 43210"
                                            {...signupRegister('phone')}
                                            error={signupErrors.phone}
                                        />

                                        <PasswordInput
                                            label="Password"
                                            placeholder="Create a strong password"
                                            {...signupRegister('password')}
                                            error={signupErrors.password}
                                        />

                                        {/* Password Strength Meter */}
                                        {passwordValue && (
                                            <div className="flex gap-1 h-1 mt-1">
                                                {[1, 2, 3, 4].map(i => (
                                                    <div
                                                        key={i}
                                                        className={`h-full rounded-full flex-1 transition-all duration-300 ${strength >= i
                                                            ? (strength < 2 ? 'bg-red-400' : strength < 4 ? 'bg-yellow-400' : 'bg-green-500')
                                                            : 'bg-gray-200'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        <PasswordInput
                                            label="Confirm Password"
                                            placeholder="Repeat password"
                                            {...signupRegister('confirmPassword')}
                                            error={signupErrors.confirmPassword}
                                        />

                                        <div className="flex items-start gap-2">
                                            <input
                                                type="checkbox"
                                                id="terms"
                                                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                {...signupRegister('terms')}
                                            />
                                            <label htmlFor="terms" className="text-sm text-text-muted leading-tight">
                                                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                                            </label>
                                        </div>
                                        {signupErrors.terms && <p className="text-xs text-status-error ml-6">{signupErrors.terms.message}</p>}

                                        <Button
                                            type="submit"
                                            disabled={isSignupSubmitting || isLoading}
                                            className="w-full py-3 text-lg font-semibold bg-secondary hover:bg-secondary-light shadow-lg hover:shadow-secondary/20 btn-strong-shadow text-white"
                                        >
                                            {isLoading && !isLogin ? 'Creating Account...' : 'Create Account'}
                                        </Button>
                                    </form>

                                    <p className="text-center text-sm text-text-muted mt-4">
                                        Already have an account?{' '}
                                        <button
                                            onClick={() => toggleView(true)}
                                            className="font-semibold text-primary hover:underline cursor-pointer"
                                        >
                                            Log In
                                        </button>
                                    </p>
                                </motion.div>
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
