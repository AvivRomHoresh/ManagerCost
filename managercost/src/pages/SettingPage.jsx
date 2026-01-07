import { useState } from "react";
import CurrencySettingsForm from "../components/settings/CurrencySettingsForm";
import { fetchCurrencyRates } from "../services/currencyService";

export default function SettingsPage() {
    const [rates, setRates] = useState(null);
    const [status, setStatus] = useState("idle"); // idle | loading | success | error
    const [error, setError] = useState("");

    const handleSaved = async () => {
        try {
            setStatus("loading");
            setError("");
            setRates(null);

            const data = await fetchCurrencyRates();
            setRates(data);
            setStatus("success");
        } catch (e) {
            setStatus("error");
            setError(e?.message || "Unknown error");
        }
    };

    return (
        <>
            <h1>Settings</h1>
            <CurrencySettingsForm onSaved={handleSaved} />

            <hr style={{ margin: "20px 0" }} />
            <h2>Rates Preview</h2>

            {status === "idle" && <p>Click Save to load rates.</p>}
            {status === "loading" && <p>Loading rates…</p>}
            {status === "error" && <p style={{ color: "red" }}>Error: {error}</p>}

            {status === "success" && rates && (
                <pre style={{ background: "#f5f5f5", padding: 12 }}>
          {JSON.stringify(rates, null, 2)}
        </pre>
            )}
        </>
    );
}
