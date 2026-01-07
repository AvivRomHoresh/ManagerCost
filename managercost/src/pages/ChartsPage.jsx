import { useEffect, useMemo, useState } from "react";
import CurrencyPicker from "../components/settings/CurrencyPicker";
import MonthYearPicker from "../components/costs/MonthYearPicker";
import PieChartByCategory from "../components/charts/PieChartByCategory";
import YearlyBarChart from "../components/charts/YearlyBarChart";
import { getAllCosts, getCostsByMonthYear } from "../db/idb";
import { fetchCurrencyRates } from "../services/currencyService";
import { convert } from "../utils/currency";

export default function ChartsPage() {
    const [currency, setCurrency] = useState("USD");

    // rates
    const [rates, setRates] = useState(null);

    // Pie
    const [pieYear, setPieYear] = useState(2026);
    const [pieMonth, setPieMonth] = useState(1);
    const [pieCosts, setPieCosts] = useState([]);

    // Bar
    const [barYear, setBarYear] = useState(2026);
    const [allCosts, setAllCosts] = useState([]);

    // טוענים rates פעם אחת
    useEffect(() => {
        fetchCurrencyRates().then(setRates).catch(console.error);
    }, []);

    // Pie costs לפי חודש/שנה
    useEffect(() => {
        (async () => {
            const data = await getCostsByMonthYear(pieYear, pieMonth);
            setPieCosts(data);
        })();
    }, [pieYear, pieMonth]);

    // Bar costs (כל ההוצאות)
    useEffect(() => {
        (async () => {
            const data = await getAllCosts();
            setAllCosts(data);
        })();
    }, []);

    // Pie data (מתעדכן מיידית כשcurrency משתנה)
    const pieData = useMemo(() => {
        if (!rates) return [];
        const map = {};

        for (const c of pieCosts) {
            const cat = c.category || "Uncategorized";
            const val = convert(c.sum, c.currency, currency, rates);
            map[cat] = (map[cat] || 0) + val;
        }

        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [pieCosts, currency, rates]);

    const barData = useMemo(() => {
        const base = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, total: 0 }));
        if (!rates) return base;

        for (const c of allCosts) {
            if (!c.date) continue;

            const y = Number(c.date.slice(0, 4));
            const m = Number(c.date.slice(5, 7));
            if (y !== barYear || m < 1 || m > 12) continue;

            base[m - 1].total += convert(c.sum, c.currency, currency, rates);
        }

        return base;
    }, [allCosts, barYear, currency, rates]);


    return (
        <>
            <h1>Charts</h1>

            <CurrencyPicker value={currency} onChange={setCurrency} />
            {!rates && <p>Loading rates…</p>}

            <hr style={{ margin: "20px 0" }} />

            <h2>Pie (by category)</h2>
            <MonthYearPicker
                year={pieYear}
                month={pieMonth}
                onYearChange={setPieYear}
                onMonthChange={setPieMonth}
            />
            <PieChartByCategory data={pieData} />

            <hr style={{ margin: "20px 0" }} />

            <h2>Bar (year totals)</h2>
            <label>
                Year{" "}
                <input
                    type="number"
                    value={barYear}
                    onChange={(e) => setBarYear(Number(e.target.value))}
                    min="2000"
                    max="2100"
                />
            </label>

            <YearlyBarChart data={barData} />
        </>
    );
}
