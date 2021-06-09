export default function weeksBetween(dateString1, dateString2) {
    const date1 = Date.parse(dateString1);
    const date2 = Date.parse(dateString2);
    return Math.round((date2 - date1) / (7 * 24 * 60 * 60 * 1000));
}