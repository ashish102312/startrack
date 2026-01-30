export interface Issue {
    _id: string;
    title: string;
    description: string;
    type: 'incident' | 'bug' | 'task';
    priority: 'high' | 'medium' | 'low';
    status: 'open' | 'in_progress' | 'resolved';
    createdBy: string;
    assignedTo: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

export type IssueType = Issue['type'];
export type Priority = Issue['priority'];
export type Status = Issue['status'];
