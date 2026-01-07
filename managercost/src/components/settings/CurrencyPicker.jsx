const CurrencyPicker = ({ value, onChange }) => {
    return (
        <label>
            Currency
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{ marginLeft: "8px" }}
            >
                <option value="USD">USD</option>
                <option value="ILS">ILS</option>
                <option value="GBP">GBP</option>
                <option value="EURO">EURO</option>
            </select>
        </label>
    );
};

export default CurrencyPicker;
