import { Activity } from 'lucide-react';
import type { Issue } from '../types';

export const Stats = ({ issues }: { issues: Issue[] }) => {
    const incidentCount = issues.filter(i => i.type === 'incident' && i.status !== 'resolved').length;
    const highPriorityCount = issues.filter(i => i.priority === 'high' && i.status !== 'resolved').length;
    const activeCount = issues.filter(i => i.status !== 'resolved').length;
    const resolvedCount = issues.filter(i => i.status === 'resolved').length;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-6 bg-white relative group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/10" />
                <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-slate-500 text-xs font-bold uppercase tracking-wider group-hover:text-blue-600 transition-colors">Active Incidents</div>
                        <Activity size={16} className={`text-slate-400 group-hover:text-blue-500 transition-colors ${incidentCount > 0 ? 'animate-bounce' : ''}`} />
                    </div>
                    <div className="text-4xl font-bold text-slate-900 leading-none group-hover:scale-105 origin-left transition-transform">{incidentCount}</div>
                    <div className={`mt-3 text-sm flex items-center gap-2 ${incidentCount > 0 ? 'text-red-500' : 'text-slate-500'}`}>
                        {incidentCount > 0 ? (
                            <>
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                </span>
                                Requires attention
                            </>
                        ) : 'All systems normal'}
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 bg-white relative group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-red-500/10" />
                <div className="relative">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-red-600 transition-colors">High Priority</div>
                    <div className="text-4xl font-bold text-red-500 leading-none group-hover:scale-105 origin-left transition-transform">{highPriorityCount}</div>
                    <div className="mt-3 text-sm text-slate-500">
                        Unresolved critical issues
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 bg-white relative group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-blue-500/10" />
                <div className="relative">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-blue-600 transition-colors">Total Active</div>
                    <div className="text-4xl font-bold text-blue-500 leading-none group-hover:scale-105 origin-left transition-transform">{activeCount}</div>
                    <div className="mt-3 text-sm text-slate-500">
                        Across all queues
                    </div>
                </div>
            </div>

            <div className="glass-card p-6 bg-white relative group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-emerald-500/10" />
                <div className="relative">
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 group-hover:text-emerald-600 transition-colors">Resolved</div>
                    <div className="text-4xl font-bold text-emerald-500 leading-none group-hover:scale-105 origin-left transition-transform">{resolvedCount}</div>
                    <div className="mt-3 text-sm text-slate-500">
                        Fixed & Closed
                    </div>
                </div>
            </div>
        </div>
    )
}
