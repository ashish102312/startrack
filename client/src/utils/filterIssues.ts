import type { Issue } from '../types';

export const filterIssuesBySearch = (issues: Issue[], query: string): Issue[] => {
    if (!query.trim()) return issues;
    const lower = query.toLowerCase();
    return issues.filter(i => 
        i.title.toLowerCase().includes(lower) || 
        (i._id && i._id.toLowerCase().includes(lower)) ||
        (i.description && i.description.toLowerCase().includes(lower))
    );
};
