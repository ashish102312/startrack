import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Lock, ArrowRight, Github, Twitter } from 'lucide-react';
import { Logo } from '../components/Logo';

import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                email,
                password
            });

            login(res.data.token, res.data.user);
            toast.success("Welcome back!", {
                description: "You have successfully logged in."
            });
            navigate('/dashboard');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.msg || "Login failed. Please check your credentials.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        toast.info(`Connecting to ${provider}...`, {
            description: "Redirecting to authentication provider."
        });
        setTimeout(() => {
            toast.success(`Connected with ${provider}`);
            navigate('/dashboard');
        }, 2000);
    };

    const handleForgotPassword = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email instructions.", {
                description: "We verify input field before sending reset link."
            });
            return;
        }
        toast.success("Reset link sent!", {
            description: `Check ${email} for password reset instructions.`
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-md p-6 relative z-10">
                <div className="glass-card bg-white p-8 md:p-10 shadow-2xl border border-white/20">
                    <div className="flex flex-col items-center mb-8">
                        <div className="mb-4 scale-125">
                            <Logo />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
                        <p className="text-slate-500 text-sm mt-1">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
                            </label>
                            <button onClick={handleForgotPassword} className="text-blue-600 hover:text-blue-700 font-medium hover:underline bg-transparent border-none cursor-pointer">Forgot password?</button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleSocialLogin('GitHub')}
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer group"
                            >
                                <Github size={18} className="text-slate-700 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-slate-700">GitHub</span>
                            </button>
                            <button
                                onClick={() => handleSocialLogin('Twitter')}
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer group"
                            >
                                <Twitter size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-slate-700">Twitter</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Don't have an account?{' '}
                        <button onClick={() => navigate('/signup')} className="font-medium text-blue-600 hover:text-blue-500 hover:underline bg-transparent border-none cursor-pointer">Sign up for free</button>
                    </p>
                </div>
            </div>
        </div>
    );
};
