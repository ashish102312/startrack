import { Zap, Plus, Search, Terminal, Bell } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface HeaderProps {
    onRefresh: () => void;
    onCreate: () => void;
    onlineCount?: number;
}

export const Header = ({ onRefresh, onCreate, onlineCount = 1 }: HeaderProps) => {
    const [showNotifications, setShowNotifications] = useState(false);

    const recentNotifications = [
        { id: 1, title: "New Critical Incident", desc: "Server downtime reported in US-East", time: "2 min ago", unread: true },
        { id: 2, title: "Issue Resolved", desc: "Login bug fixed by Sarah", time: "1 hour ago", unread: false },
        { id: 3, title: "System Update", desc: "Maintenance scheduled for tonight", time: "5 hours ago", unread: false },
    ];

    return (
        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 relative z-40">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Dashboard</span>
                    <div className="px-2 py-0.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                        v2.0
                    </div>
                </h1>
                <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5 ml-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-slate-600">System Operational</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <div className="ml-0 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium">
                        {onlineCount} online
                    </div>

                    {/* Bell Notification System */}
                    <div className="relative ml-4">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 bg-white rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors group outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                            <Bell size={20} className={`text-slate-500 transition-colors ${showNotifications ? 'text-blue-600' : 'group-hover:text-slate-900'}`} />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                        </button>

                        {/* Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                                    <h3 className="font-semibold text-slate-900 text-sm">Notifications</h3>
                                    <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                                </div>
                                <div className="max-h-[300px] overflow-y-auto">
                                    {recentNotifications.map((notif) => (
                                        <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${notif.unread ? 'bg-blue-50/30' : ''}`}>
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className={`text-sm font-medium ${notif.unread ? 'text-slate-900' : 'text-slate-600'}`}>{notif.title}</h4>
                                                <span className="text-[10px] text-slate-400 font-medium">{notif.time}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 line-clamp-2">{notif.desc}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 text-center bg-slate-50/50 border-t border-slate-50">
                                    <button className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors">View all history</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <p className="text-slate-500 text-sm mt-1">Real-Time Issue & Incident Tracker</p>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onRefresh}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer"
                >
                    <Zap size={16} /> Live
                </button>
                <button
                    onClick={onCreate}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2 text-sm font-medium cursor-pointer"
                >
                    <Plus size={18} /> New Issue
                </button>
            </div>
        </header>
    );
};

interface FilterBarProps {
    filter: string;
    setFilter: (val: string) => void;
}

export const FilterBar = ({ filter, setFilter }: FilterBarProps) => (
    <div className="mb-6 flex gap-4">
        <div className="glass flex items-center px-4 py-3 rounded-xl flex-1 border border-border-subtle focus-within:border-blue-500/50 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all bg-white">
            <Search size={18} className="text-slate-400 mr-3" />
            <input
                type="text"
                placeholder="Search issues, bugs, tasks..."
                className="bg-transparent border-none w-full p-0 outline-none text-slate-900 placeholder-slate-400 text-[0.925rem]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
        <button
            onClick={() => {
                setFilter('');
                toast.info("Filter cleared");
            }}
            className="glass w-12 flex items-center justify-center rounded-xl cursor-pointer hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600 bg-white"
            title="Clear Filter"
        >
            <Terminal size={18} />
        </button>
    </div>
);
