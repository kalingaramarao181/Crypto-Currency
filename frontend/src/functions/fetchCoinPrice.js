import axios from 'axios';
import { useEffect, useState } from 'react';

const baseUrl = 'https://api.coingecko.com/api/v3/coins/';
const id = 'bitcoin'; // replace with your desired coin id
const days = 10; // Fetching 10 days to cover the date range

export const fetchPrices = async () => {
  try {
    const response = await axios.get(`${baseUrl}${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
        interval: 'daily'
      }
    });
    
    const prices = response.data.prices;

    // Function to get price on a specific date
    const getPriceOnDate = (dateString) => {
      const targetDate = new Date(dateString).getTime();
      const priceData = prices.find(price => {
        const date = new Date(price[0]).getTime();
        return date === targetDate;
      });
      return priceData ? priceData[1] : null;
    };

    // Get prices for specific dates
    const priceStart = getPriceOnDate('2023-06-19');
    const priceEnd = getPriceOnDate('2023-06-25');

    if (priceStart !== null && priceEnd !== null) {
      const profitOrLoss = priceEnd - priceStart;
      console.log(profitOrLoss >= 0 ? `Profit: ${profitOrLoss}` : `Loss: ${profitOrLoss}`);
    } else {
      console.error('Price data not available for the specified dates');
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

