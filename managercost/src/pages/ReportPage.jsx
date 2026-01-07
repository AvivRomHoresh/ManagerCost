import { useEffect, useMemo, useState } from "react";
import MonthYearPicker from "../components/costs/MonthYearPicker";
import CurrencyPicker from "../components/settings/CurrencyPicker";
import CostList from "../components/costs/CostList";
import { getCostsByMonthYear } from "../db/idb";
import { fetchCurrencyRates } from "../services/currencyService";
import { convert } from "../utils/currency";

export default function ReportPage() {
    const [year, setYear] = useState(2026);
    const [month, setMonth] = useState(1);
    const [currency, setCurrency] = useState("USD");

    const [rates, setRates] = useState(null);
    const [reportCosts, setReportCosts] = useState([]);

    useEffect(() => {
        fetchCurrencyRates().then(setRates).catch(console.error);
    }, []);

    const handleGetReport = async () => {
        const data = await getCostsByMonthYear(year, month);
        setReportCosts(data);
    };

    const displayCosts = useMemo(() => {
        if (!rates) return reportCosts;
        return reportCosts.map((c) => ({
            ...c,
            displaySum: convert(c.sum, c.currency, currency, rates),
            displayCurrency: currency,
        }));
    }, [reportCosts, currency, rates]);

    const total = useMemo(() => {
        if (!rates) return 0;
        return reportCosts.reduce(
            (acc, c) => acc + convert(c.sum, c.currency, currency, rates),
            0
        );
    }, [reportCosts, currency, rates]);

    return (
        <>
            <h1>Monthly Report</h1>

            <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
                <MonthYearPicker
                    year={year}
                    month={month}
                    onYearChange={setYear}
                    onMonthChange={setMonth}
                />
                <CurrencyPicker value={currency} onChange={setCurrency} />
                <button onClick={handleGetReport}>Get Report</button>
            </div>

            <hr style={{ margin: "20px 0" }} />

            {!rates ? (
                <p>Loading rates… (go to Settings if URL is missing)</p>
            ) : (
                <>
                    <CostList costs={displayCosts} />
                    <h3>
                        Total: {total.toFixed(2)} {currency}
                    </h3>
                </>
            )}
        </>
    );
}
