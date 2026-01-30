import { useState } from 'react';
import { History, CheckCircle2, ChevronDown, ChevronUp, AlertCircle, Bug, ClipboardList } from 'lucide-react';
import type { Issue } from '../types';

interface ResolvedHistoryProps {
    issues: Issue[];
}

export const ResolvedHistory = ({ issues }: ResolvedHistoryProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const resolvedIssues = issues.filter(i => i.status === 'resolved');

    if (resolvedIssues.length === 0) return null;

    return (
        <div id="resolved-history" className="glass-card bg-white mt-8 overflow-hidden border-l-4 border-l-emerald-500">
            <div
                className="p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100/50 rounded-lg text-emerald-600">
                        <History size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Resolution History</h3>
                        <p className="text-sm text-slate-500">Track solved issues and lessons learned</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-500">{resolvedIssues.length} resolved</span>
                    {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-slate-100 bg-slate-50/30">
                    <div className="divide-y divide-slate-100">
                        {resolvedIssues.map((issue) => (
                            <div key={issue._id} className="p-4 hover:bg-white transition-colors flex gap-4 items-start group">
                                <div className="mt-1">
                                    <CheckCircle2 size={18} className="text-emerald-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                                            {issue.title}
                                        </h4>
                                        <span className="text-xs text-slate-400 font-mono">#{issue._id.slice(-4)}</span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                                        {issue.description || "No description provided."}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs">
                                        <span className="flex items-center gap-1 text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                                            {issue.type === 'incident' ? <AlertCircle size={12} className="text-red-500" /> :
                                                issue.type === 'bug' ? <Bug size={12} className="text-amber-500" /> :
                                                    <ClipboardList size={12} className="text-emerald-500" />}
                                            <span className="capitalize">{issue.type}</span>
                                        </span>
                                        <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                                            Resolved {new Date(issue.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
