export function getFormattedDate({ dateString }: { dateString: string }) {

    const todayOnly = new Date();
    todayOnly.setHours(0, 0, 0, 0);
    const dueDateOnly = new Date(dateString);
    dueDateOnly.setHours(0, 0, 0, 0);
    const diffInDays = (dueDateOnly.getTime() - todayOnly.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays === 0) {
        return 'TODAY'
    }
    if (diffInDays === 1) {
        return 'TOMORROW';
    }
    if (diffInDays === -1) {
        return 'YESTERDAY';
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return dueDateOnly.toLocaleDateString(undefined, options)
}