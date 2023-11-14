import { v4 } from "uuid";

export default function genereteData(data: any[]) {
    // Grouping the requested data by 'name' (t1 and t2)
    const groupedData = data.reduce((acc, item) => {
        if (!acc[item.name]) {
            acc[item.name] = [];
        }
        acc[item.name].push(item.value);
        return acc;
    }, {});

    // Creating a table using the grouped data
    const table = [];
    const keys = Object.keys(groupedData);
    const maxRows = Math.max(...keys.map(key => groupedData[key].length));

    for (let i = 0; i < maxRows; i++) {
        const row: any = {};
        keys.forEach(key => {
            row[key] = groupedData[key][i] || ''; // Filling empty spaces if values are missing
        });
        table.push(row);
    }

    return table.map((tb, index) => ({ Id: v4(), ...tb, Index: index + 1 }))
}