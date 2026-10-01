export const getPriorityVariant = (priority: string): 'red' | 'amber' | 'green' => {
    switch (priority) {
        case 'high': return 'red';
        case 'medium': return 'amber';
        case 'low': return 'green';
        default: return 'amber';
    }
};
