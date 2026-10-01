export type IssueType = 'incident' | 'bug' | 'task';
export type IssuePriority = 'high' | 'medium' | 'low';
export type IssueStatus = 'open' | 'in_progress' | 'resolved';

export interface BaseIssue {
    title: string;
    description?: string;
    type: IssueType;
    priority: IssuePriority;
    status: IssueStatus;
    assignedTo?: string;
    tags?: string[];
}
