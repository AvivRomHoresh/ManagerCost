import { useState } from "react";
import CurrencyPicker from "../settings/CurrencyPicker";

const todayISO = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
};

export default function AddCostForm({ onSubmit }) {
    const [date, setDate] = useState(todayISO());
    const [sum, setSum] = useState("");
    const [currency, setCurrency] = useState("USD");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            date,
            sum,
            currency,
            category,
            description,
        });

        setSum("");
        setCategory("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 360 }}>
            <label>
                Date
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>

            <label>
                Sum
                <input type="number" value={sum} onChange={(e) => setSum(e.target.value)} required />
            </label>

            <CurrencyPicker value={currency} onChange={setCurrency} />

            <label>
                Category
                <input value={category} onChange={(e) => setCategory(e.target.value)} required />
            </label>

            <label>
                Description
                <input value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>

            <button type="submit">Add Cost</button>
        </form>
    );
}
