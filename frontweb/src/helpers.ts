import { formatGender } from "./formatters";
import { SalesByGender } from "./types/salesByGender";

export const buildSalesByGenderChart = (sales: SalesByGender[]) => {
    const labels = sales.map((sale) => formatGender(sale.gender));
    const series = sales.map((sale) => sale.sum);

    return {
        labels,
        series
    };
};