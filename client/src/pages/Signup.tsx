import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Mail, Lock, User, ArrowRight, Github, Twitter } from 'lucide-react';
import { Logo } from '../components/Logo';

import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export const Signup = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreeToTerms) {
            toast.error("Please agree to the Terms of Service");
            return;
        }
        setLoading(true);

        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                username,
                email,
                password
            });

            login(res.data.token, res.data.user);
            toast.success("Account created successfully!", {
                description: "Welcome to Startrack."
            });
            navigate('/dashboard');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.msg || "Signup failed. Please try again.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignup = (provider: string) => {
        toast.info(`Connecting to ${provider}...`, {
            description: "Redirecting to authentication provider."
        });
        setTimeout(() => {
            toast.success(`Connected with ${provider}`);
            navigate('/dashboard');
        }, 2000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <div className="w-full max-w-md p-6 relative z-10">
                <div className="glass-card bg-white p-8 md:p-10 shadow-2xl border border-white/20">
                    <div className="flex flex-col items-center mb-8">
                        <div className="mb-4 scale-125">
                            <Logo />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Create an account</h2>
                        <p className="text-slate-500 text-sm mt-1">Join thousands of developers tracking bugs faster</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-700 ml-1">Username</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="johndoe"
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 placeholder:text-slate-400"
                                />
                            </div>
                        </div>

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

                        <div className="flex items-center text-sm">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <span className="text-slate-600 group-hover:text-slate-900 transition-colors">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a></span>
                            </label>
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
                                    Create Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
                                <span className="px-2 bg-white text-slate-500">Or sign up with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button
                                onClick={() => handleSocialSignup('GitHub')}
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer group"
                            >
                                <Github size={18} className="text-slate-700 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-slate-700">GitHub</span>
                            </button>
                            <button
                                onClick={() => handleSocialSignup('Twitter')}
                                className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer group"
                            >
                                <Twitter size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-medium text-slate-700">Twitter</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Already have an account?{' '}
                        <button onClick={() => navigate('/login')} className="font-medium text-blue-600 hover:text-blue-500 hover:underline bg-transparent border-none cursor-pointer">Sign in</button>
                    </p>
                </div>
            </div>
        </div>
    );
};
