import { int } from "drizzle-orm/mysql-core";

interface PortfolioData {
    Date: string; 
    Capital: number;
}

export const lastNMonthsProfit = (data: PortfolioData[], n: number) => {
    if (!Array.isArray(data) || data.length === 0) {
        console.warn("Invalid or empty data passed to lastNMonthsProfit:", data);
        return [];
    }

    // Group data by month (YYYY-MM format)
    const groupedByMonth = Array.from(
        data.reduce((map, item) => {
            const month = new Date(item.Date).toISOString().slice(0, 7); // Extract YYYY-MM
            if (!map.has(month)) {
                map.set(month, item);
            } else {
                map.set(month, item); // Keep the last entry of the month
            }
            return map;
        }, new Map<string, PortfolioData>())
    ).map(([month, item]) => item);

    // Get the last N months of data
    const required = groupedByMonth.slice(-n - 1);

    // Calculate profit for each month
    const lastNMonthsProfit = required.map((point, index) => {
        const formattedMonth = new Date(point.Date).toISOString().slice(0, 7); // Extract YYYY-MM

        if (index === 0) {
            return {
                Month: formattedMonth,
                Profit: 0,
            };
        } else {
            return {
                Month: formattedMonth,
                Profit: point.Capital - required[index - 1].Capital,
            };
        }
    });

    return lastNMonthsProfit;
};