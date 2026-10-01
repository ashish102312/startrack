import type { Issue } from '../types';

export const sortIssuesByDate = (issues: Issue[], ascending = false): Issue[] => {
    return [...issues].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return ascending ? timeA - timeB : timeB - timeA;
    });
};
