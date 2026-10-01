export const getStatusLabel = (status: string): string => {
    switch (status) {
        case 'open': return 'Open';
        case 'in_progress': return 'In Progress';
        case 'resolved': return 'Resolved';
        default: return status;
    }
};
