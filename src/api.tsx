export async function fetchCoins() {
    return fetch("https://api.coinpaprika.com/v1/coins").then((res) =>
        res.json()
    );
}
