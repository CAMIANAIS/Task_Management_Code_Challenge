export function getColoredDueDate({ dateString }: { dateString: string }) {

    const todayOnly = new Date();
    todayOnly.setHours(0, 0, 0, 0);
    const dueDateOnly = new Date(dateString);
    dueDateOnly.setHours(0, 0, 0, 0);
    const diffInDays = (dueDateOnly.getTime() - todayOnly.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays < 0) {
        return { text: 'var(--color-primary-4)', background: 'rgba(218, 88, 75, 0.1)' };
    }
    else if (diffInDays < 2) {
        return { text: 'var(--color-tertiary-3)', background: 'rgba(235, 199, 127, 0.1)' };
    }
    else {
        return { text: 'var(--color-secondary-4)', background: 'rgba(112, 178, 82, 0.1)' };
    }
}