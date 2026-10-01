import type { Issue } from '../types';

export interface ServerToClientEvents {
    ONLINE_COUNT: (count: number) => void;
    ISSUE_ADDED: (issue: Issue) => void;
    ISSUE_UPDATED: (issue: Issue) => void;
    ISSUE_DELETED: (id: string) => void;
    REFRESH_ALL: () => void;
}
