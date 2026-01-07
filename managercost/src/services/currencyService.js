const DEFAULT_RATES_URL =
    "https://raw.githubusercontent.com/AvivRomHoresh/currency-rates/main/rates.json";

export async function fetchCurrencyRates() {
    const userUrl = localStorage.getItem("currencyApiUrl");

    const urlToFetch =
        userUrl && userUrl.trim() !== "" ? userUrl : DEFAULT_RATES_URL;

    const res = await fetch(urlToFetch);

    if (!res.ok) {
        throw new Error(`Failed to fetch currency rates from ${urlToFetch}`);
    }

    return res.json();
}
