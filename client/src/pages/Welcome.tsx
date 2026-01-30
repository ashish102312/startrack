import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Shield, Zap } from 'lucide-react';
import { Logo } from '../components/Logo';

export const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden bg-background">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2"></div>

            {/* Navigation Bar */}
            <nav className="w-full px-6 py-6 absolute top-0 z-50 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <Logo />
                    <span className="font-bold text-xl tracking-tight text-slate-900">Startrack</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20"
                    >
                        Sign up
                    </button>
                </div>
            </nav>

            <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-32">
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-500/10 scale-150">
                        <Logo />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-slate-900">
                    Incident management,
                    <br />
                    <span className="text-gradient">reimagined for speed.</span>
                </h1>

                <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Startrack helps engineering teams track, manage, and resolve incidents in real-time.
                    Stop fire-fighting in the dark.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                    <button
                        onClick={() => navigate('/login')}
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 flex items-center gap-2 text-lg cursor-pointer overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Started
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </button>

                    <button
                        onClick={() => {
                            window.open('https://youtu.be/X3jw1JVNdPE?si=20J60udgPex5wjKu', '_blank');
                        }}
                        className="group px-8 py-4 bg-white text-slate-700 border border-slate-200 hover:border-blue-300/50 hover:bg-slate-50 rounded-full font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Watch Demo Video
                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-current border-b-[4px] border-b-transparent ml-0.5" />
                        </div>
                    </button>
                </div>

                {/* Trusted By Section */}
                <div className="mb-24 py-10 border-y border-slate-100 bg-slate-50/30 w-screen relative -left-[calc(50vw-50%)]">
                    <div className="max-w-4xl mx-auto px-6">
                        <p className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-8 text-center">Trusted by engineering teams at</p>
                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale hover:grayscale-0 transition-all duration-500">
                            {['Acme Corp', 'Globex', 'Soylent', 'Umbrella', 'Cyberdyne'].map((company) => (
                                <span key={company} className="text-xl md:text-2xl font-black text-slate-300 hover:text-slate-800 cursor-default transition-colors duration-300 select-none">
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-32 relative">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="glass-card p-8 bg-white/80 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20 border border-slate-200/60 hover:border-amber-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-amber-500/10" />
                        <div className="mb-6 p-3.5 bg-amber-50 w-fit rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                            <Zap className="text-amber-500 group-hover:text-white transition-colors duration-300" size={28} />
                        </div>
                        <h3 className="text-xl text-slate-900 font-bold mb-3">Real-Time Updates</h3>
                        <p className="text-slate-600 leading-relaxed">Instant synchronization across everyone on the team using advanced WebSockets technology.</p>
                    </div>

                    <div className="glass-card p-8 bg-white/80 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/20 border border-slate-200/60 hover:border-emerald-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-emerald-500/10" />
                        <div className="mb-6 p-3.5 bg-emerald-50 w-fit rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                            <Shield className="text-emerald-500 group-hover:text-white transition-colors duration-300" size={28} />
                        </div>
                        <h3 className="text-xl text-slate-900 font-bold mb-3">Enterprise Grade</h3>
                        <p className="text-slate-600 leading-relaxed">Bank-grade security, 99.9% uptime SLA, and built to scale with your organization's needs.</p>
                    </div>

                    <div className="glass-card p-8 bg-white/80 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 border border-slate-200/60 hover:border-purple-500/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-purple-500/10" />
                        <div className="mb-6 p-3.5 bg-purple-50 w-fit rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-sm">
                            <Activity className="text-purple-500 group-hover:text-white transition-colors duration-300" size={28} />
                        </div>
                        <h3 className="text-xl text-slate-900 font-bold mb-3">Full Observability</h3>
                        <p className="text-slate-600 leading-relaxed">Track key metrics and improve mean-time-to-resolution with our detailed insights dashboard.</p>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Loved by developers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="glass-card p-8 bg-gradient-to-br from-white to-blue-50/30 border border-slate-200/60 hover:border-blue-200 transition-colors shadow-lg hover:shadow-xl">
                            <div className="mb-6 text-blue-500">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" /></svg>
                            </div>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">"Startrack has completely transformed how we handle incidents. The real-time updates are a game changer for our distributed team."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">JD</div>
                                <div>
                                    <div className="font-bold text-slate-900">John Doe</div>
                                    <div className="text-sm text-slate-500 font-medium">CTO at TechStart</div>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-8 bg-gradient-to-br from-white to-purple-50/30 border border-slate-200/60 hover:border-purple-200 transition-colors shadow-lg hover:shadow-xl">
                            <div className="mb-6 text-purple-500">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" /></svg>
                            </div>
                            <p className="text-lg text-slate-700 leading-relaxed mb-6 font-medium">"Finally, a tool that looks good and works even better. The insights we get are invaluable for improving our system stability."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center font-bold text-white shadow-md">JS</div>
                                <div>
                                    <div className="font-bold text-slate-900">Jane Smith</div>
                                    <div className="text-sm text-slate-500 font-medium">VP Engineering at DataCo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="absolute bottom-6 text-zinc-600 text-sm">
                © 2026 Startrack Inc.
            </footer>
        </div>
    );
};
