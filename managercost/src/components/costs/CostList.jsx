export default function CostList({ costs, onDelete }) {
    if (!costs || costs.length === 0) return <p>No costs yet.</p>;

    return (
        <ul>
            {costs.map((c) => {
                const shownSum = c.displaySum ?? c.sum;
                const shownCurrency = c.displayCurrency ?? c.currency;

                return (
                    <li key={c.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span>
              <strong>{c.date}</strong> — {Number(shownSum).toFixed(2)} {shownCurrency}
                {" | "} {c.category} {" | "} {c.description}
            </span>

                        {onDelete && (
                            <button style={{ marginLeft: "auto" }} onClick={() => onDelete(c.id)}>
                                Delete
                            </button>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
