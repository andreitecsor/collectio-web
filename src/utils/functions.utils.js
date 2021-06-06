export default function weeksBetween(date1, date2) {
    return Math.round((date2 - date1) / (7 * 24 * 60 * 60 * 1000));
}