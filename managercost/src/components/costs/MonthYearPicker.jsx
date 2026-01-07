const MonthYearPicker = ({ year, month, onYearChange, onMonthChange }) => {
    return (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <label>
                Year
                <input
                    type="number"
                    value={year}
                    onChange={(e) => onYearChange(Number(e.target.value))}
                    min="2000"
                    max="2100"
                    style={{ marginLeft: "8px" }}
                />
            </label>

            <label>
                Month
                <input
                    type="number"
                    value={month}
                    onChange={(e) => onMonthChange(Number(e.target.value))}
                    min="1"
                    max="12"
                    style={{ marginLeft: "8px" }}
                />
            </label>
        </div>
    );
};

export default MonthYearPicker;
