export default function groupBy(data, key) {
    return data.reduce((accumulator, x) => {
        accumulator[x[key]] = [...(accumulator[x[key]] || []), x];
        return accumulator;
    }, {});
}
