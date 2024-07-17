import axios from "axios";

const MAX_RETRIES = 3;

export const getPrices = async (id, days, priceType, setError, retryCount = 0) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
    );

    if (response.data) {
      console.log("Prices>>>", response.data);
      if (priceType === "market_caps") {
        return response.data.market_caps;
      } else if (priceType === "total_volumes") {
        return response.data.total_volumes;
      } else {
        return response.data.prices;
      }
    }
  } catch (e) {
    console.log(e.message);
    if (e.response && e.response.status === 429 && retryCount < MAX_RETRIES) {
      const retryAfter = (2 ** retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
      console.log(`Retrying after ${retryAfter / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter));
      return getPrices(id, days, priceType, setError, retryCount + 1);
    } else {
      if (setError) {
        setError(true);
      }
    }
  }
  return null;
};
