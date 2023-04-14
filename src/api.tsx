const BASE_URL = `https://api.coinpaprika.com/v1`;
const NICO_BASE_URL = `https://ohlcv-api.nomadcoders.workers.dev?coinId=btc-bitcoin`;

export async function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export async function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export async function fetchTickersInfo(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

export async function fetchCoinHistory(coinId: string) {
    return fetch(`${NICO_BASE_URL}`).then((res) => res.json());
}
