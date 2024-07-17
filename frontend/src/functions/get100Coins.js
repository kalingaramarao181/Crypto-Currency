import axios from "axios";

const MAX_RETRIES = 5; // Adjust as needed

export const get100Coins = async (retryCount = 0) => {
  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
    return response.data;
  } catch (error) {
    console.log(`Attempt ${retryCount + 1}: ERROR>>> ${error.message}`);

    if (error.response && error.response.status === 429 && retryCount < MAX_RETRIES) {
      const retryAfter = (2 ** retryCount) * 1000;
      console.log(`Retrying after ${retryAfter / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter));
      return get100Coins(retryCount + 1);
    } else {
      console.error("Max retries reached or other error occurred");
      throw error;
    }
  }
};
