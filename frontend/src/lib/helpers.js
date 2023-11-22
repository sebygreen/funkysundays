export function dateDifference(date) {
    const current = new Date();
    const event_date = new Date(date);
    let diff = (event_date - current) / 1000;
    let d = Math.floor(diff / (60 * 60 * 24));
    let h = Math.floor((diff - d * 60 * 60 * 24) / (60 * 60));
    let m = Math.floor((diff - (d * 60 * 60 * 24 + h * 60 * 60)) / 60);
    let s = Math.floor(diff - (d * 60 * 60 * 24 + h * 60 * 60 + m * 60));
    return { days: d, hours: h, minutes: m, seconds: s };
}

export function groupBy(data, key) {
    return data.reduce((accumulator, x) => {
        accumulator[x[key]] = [...(accumulator[x[key]] || []), x];
        return accumulator;
    }, {});
}
