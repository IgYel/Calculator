export function getTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = today.getMonth() + 1;
    return `${day}.${month}`;
}