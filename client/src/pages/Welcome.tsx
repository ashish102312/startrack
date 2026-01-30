import { useNavigate } from 'react-router-dom';
import { ArrowRight, Activity, Shield, Zap } from 'lucide-react';
import { Logo } from '../components/Logo';

export const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden bg-background font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Background Gradients - Smooth pulsing */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 animate-pulse duration-[4s]"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 animate-pulse duration-[5s]"></div>

            {/* Navigation Bar - Frosted Glass */}
            <nav className="w-full px-6 py-6 fixed top-0 z-50 flex justify-between items-center max-w-7xl mx-auto backdrop-blur-md bg-white/50 border-b border-white/20 transition-all duration-300 hover:bg-white/80">
                <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                    <div className="transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                        <Logo />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">Startrack</span>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full"
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => navigate('/signup')}
                        className="px-6 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-sm font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 active:scale-95 active:translate-y-0"
                    >
                        Sign up
                    </button>
                </div>
            </nav>

            <div className="relative z-10 max-w-5xl mx-auto text-center px-6 pt-40 md:pt-48 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards">
                <div className="mb-8 flex justify-center">
                    <div className="p-4 bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl shadow-blue-500/10 scale-125 hover:scale-150 transition-all duration-500 cursor-default ring-1 ring-slate-200/50">
                        <Logo />
                    </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight text-slate-900 leading-[1.1] md:leading-[1.1]">
                    Incident management,
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text bg-300% animate-gradient">
                        reimagined for speed.
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                    Startrack helps engineering teams track, manage, and resolve incidents in <span className="text-slate-900 font-medium">real-time</span>.
                    Stop fire-fighting in the dark.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
                    <button
                        onClick={() => navigate('/login')}
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:to-blue-600 text-white rounded-full font-bold transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 active:scale-95 flex items-center gap-3 text-lg cursor-pointer overflow-hidden ring-offset-2 focus:ring-2 ring-blue-500"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Get Started Free
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                        {/* Shine effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                    </button>

                    <button
                        onClick={() => {
                            window.open('https://youtu.be/X3jw1JVNdPE?si=20J60udgPex5wjKu', '_blank');
                        }}
                        className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-700 hover:bg-white rounded-full font-bold transition-all duration-300 flex items-center gap-3 cursor-pointer shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 active:scale-95"
                    >
                        Watch Demo
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-inner group-hover:rotate-12">
                            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-current border-b-[5px] border-b-transparent ml-0.5" />
                        </div>
                    </button>
                </div>

                {/* Trusted By Section - Smooth Fade */}
                <div className="mb-32 py-12 border-y border-slate-100 bg-slate-50/50 w-screen relative -left-[calc(50vw-50%)] backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto px-6">
                        <p className="text-sm font-bold text-slate-400 tracking-[0.2em] uppercase mb-10 text-center animate-pulse">Trusted by engineering teams at</p>
                        <div className="flex flex-wrap justify-center gap-x-16 gap-y-10">
                            {['Acme Corp', 'Globex', 'Soylent', 'Umbrella', 'Cyberdyne'].map((company, i) => (
                                <span
                                    key={company}
                                    className="text-2xl md:text-3xl font-black text-slate-300 hover:text-slate-800 cursor-default transition-all duration-500 select-none hover:scale-110 transform"
                                    style={{ transitionDelay: `${i * 100}ms` }}
                                >
                                    {company}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-32 relative perspective-1000">
                    <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="glass-card p-8 bg-white/60 backdrop-blur-md hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.3)] border border-white/50 hover:border-amber-200/50 group rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -mr-8 -mt-8 transition-all duration-500 group-hover:scale-110" />
                        <div className="mb-6 p-4 bg-amber-50 w-fit rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-amber-500/40">
                            <Zap className="text-amber-500 group-hover:text-white transition-colors duration-500" size={32} />
                        </div>
                        <h3 className="text-2xl text-slate-900 font-bold mb-4 group-hover:text-amber-600 transition-colors">Real-Time Updates</h3>
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700">Instant synchronization across everyone on the team using advanced WebSockets technology.</p>
                    </div>

                    <div className="glass-card p-8 bg-white/60 backdrop-blur-md hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] border border-white/50 hover:border-emerald-200/50 group rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full -mr-8 -mt-8 transition-all duration-500 group-hover:scale-110" />
                        <div className="mb-6 p-4 bg-emerald-50 w-fit rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-emerald-500/40">
                            <Shield className="text-emerald-500 group-hover:text-white transition-colors duration-500" size={32} />
                        </div>
                        <h3 className="text-2xl text-slate-900 font-bold mb-4 group-hover:text-emerald-600 transition-colors">Enterprise Grade</h3>
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700">Bank-grade security, 99.9% uptime SLA, and built to scale with your organization's needs.</p>
                    </div>

                    <div className="glass-card p-8 bg-white/60 backdrop-blur-md hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.3)] border border-white/50 hover:border-purple-200/50 group rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -mr-8 -mt-8 transition-all duration-500 group-hover:scale-110" />
                        <div className="mb-6 p-4 bg-purple-50 w-fit rounded-2xl group-hover:bg-purple-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-purple-500/40">
                            <Activity className="text-purple-500 group-hover:text-white transition-colors duration-500" size={32} />
                        </div>
                        <h3 className="text-2xl text-slate-900 font-bold mb-4 group-hover:text-purple-600 transition-colors">Full Observability</h3>
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700">Track key metrics and improve mean-time-to-resolution with our detailed insights dashboard.</p>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div className="mb-32">
                    <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center tracking-tight">Loved by developers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="glass-card p-10 bg-white/60 backdrop-blur-sm border border-slate-100 hover:border-blue-200 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 group">
                            <div className="mb-6 text-blue-500 opacity-50 group-hover:opacity-100 transition-opacity">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" /></svg>
                            </div>
                            <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium italic">"Startrack has completely transformed how we handle incidents. The real-time updates are a game changer for our distributed team."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xl shadow-md group-hover:scale-110 transition-transform duration-300">JD</div>
                                <div>
                                    <div className="font-bold text-slate-900 text-lg">John Doe</div>
                                    <div className="text-blue-600 font-medium">CTO at TechStart</div>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-10 bg-white/60 backdrop-blur-sm border border-slate-100 hover:border-purple-200 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 group">
                            <div className="mb-6 text-purple-500 opacity-50 group-hover:opacity-100 transition-opacity">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" /></svg>
                            </div>
                            <p className="text-xl text-slate-700 leading-relaxed mb-8 font-medium italic">"Finally, a tool that looks good and works even better. The insights we get are invaluable for improving our system stability."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center font-bold text-white text-xl shadow-md group-hover:scale-110 transition-transform duration-300">JS</div>
                                <div>
                                    <div className="font-bold text-slate-900 text-lg">Jane Smith</div>
                                    <div className="text-purple-600 font-medium">VP Engineering at DataCo</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="relative py-8 text-zinc-500 text-sm font-medium w-full text-center border-t border-slate-100 bg-white/50 backdrop-blur-sm">
                © 2026 Startrack Inc. All rights reserved.
            </footer>
        </div>
    );
};
