// src/utils/currency.js//ההמרה
export function convert(amount, from, to, rates) {
    if (!rates?.[from] || !rates?.[to]) return Number(amount);

    // rates[X] = כמה X שווים ל-USD 1
    // amount(from) -> USD -> to
    const usd = Number(amount) / Number(rates[from]);
    return usd * Number(rates[to]);
}
