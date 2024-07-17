export const groupCallsByDateAndType = activities => {

    // Tie by date
    const dateGroups = activities.reduce((groups, activity) => {
        const date = new Date(activity.created_at).toLocaleDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(activity);
        return groups;
    }, {});

    Object.keys(dateGroups).forEach(date => {
        dateGroups[date] = dateGroups[date].reduce((groups, activity, index, arr) => {
            const key = `${activity.from}-${activity.call_type}`;
            if (index === 0 || key !== `${arr[index - 1].from}-${arr[index - 1].call_type}`) {
                groups.push([activity]);
            } else {
                groups[groups.length - 1].push(activity);
            }
            return groups;
        }, []);
    });

    return dateGroups;
};
