import type { Issue } from '../types';
import { Badge } from './Badge';
import { Clock, AlertCircle, MoreHorizontal, Bug, ClipboardList } from 'lucide-react';

interface Props {
    issues: Issue[];
    onEdit: (issue: Issue) => void;
}

export const IssueList = ({ issues, onEdit }: Props) => {
    return (
        <div className="glass-card flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-border-subtle flex justify-between items-center bg-slate-50/50">
                <h3 className="text-gradient text-lg font-medium">Active Issues</h3>
                <span className="text-sm text-slate-500">{issues.length} items</span>
            </div>

            <div className="flex flex-col bg-white">
                {issues.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        No active issues found
                    </div>
                ) : (
                    issues.map(issue => (
                        <div
                            key={issue._id}
                            onClick={() => onEdit(issue)}
                            className="group px-6 py-4 border-b border-border-subtle cursor-pointer grid grid-cols-[auto_1fr_auto] gap-4 items-center hover:bg-slate-50 transition-all duration-200 hover:scale-[1.005] hover:shadow-md hover:border-blue-200/50 hover:relative hover:z-10"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 group-hover:border-slate-300 transition-colors">
                                {issue.type === 'incident' ? <AlertCircle size={20} className="text-red-500" /> :
                                    issue.type === 'bug' ? <Bug size={20} className="text-amber-500" /> :
                                        <ClipboardList size={20} className="text-emerald-500" />}
                            </div>

                            <div className="min-w-0">
                                <div className="flex items-center gap-3 mb-1.5">
                                    <span className="font-medium text-slate-900 text-base truncate">{issue.title}</span>
                                    <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">{issue._id}</span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant={issue.priority === 'high' ? 'red' : issue.priority === 'medium' ? 'amber' : 'green'}>
                                        {issue.priority}
                                    </Badge>
                                    <Badge variant={issue.status === 'open' ? 'red' : issue.status === 'in_progress' ? 'blue' : 'green'}>
                                        {issue.status.replace('_', ' ')}
                                    </Badge>
                                    <span className="text-xs text-slate-500 flex items-center gap-1 ml-auto sm:ml-2">
                                        <Clock size={12} /> {new Date(issue.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>

                            <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
                                <MoreHorizontal size={20} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
