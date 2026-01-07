import { useEffect, useState } from "react";

const CurrencySettingsForm = ({ onSaved }) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        const storedUrl = localStorage.getItem("currencyApiUrl");
        if (storedUrl) setUrl(storedUrl);
    }, []);

    const handleSave = async () => {
        localStorage.setItem("currencyApiUrl", url);
        if (onSaved) await onSaved(); // <-- מפעיל fetch אחרי Save
    };

    return (
        <div style={{ maxWidth: "500px", display: "grid", gap: "12px" }}>
            <label>
                Currency Rates API URL
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="please enter URL"
                    style={{ width: "100%" }}
                />
            </label>

            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default CurrencySettingsForm;
