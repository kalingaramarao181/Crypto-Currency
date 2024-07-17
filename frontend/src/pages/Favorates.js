import React, { useEffect, useState, useCallback } from "react";
import Button from "../components/Common/Button";
import TabsComponent from "../components/Dashboard/Tabs";
import axios from "axios";
import { getFavorateCoins } from "../functions/getFavorateCoins";
import Loader from "../components/Common/Loader";
import Cookies from "js-cookie";

function Favorates() {
  const [coins, setCoins] = useState([]);
  const [watchlist, setWatchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userMail = JSON.parse(Cookies.get("userData"))[0].email;

  useEffect(() => {
    const fetchUserCoins = async () => {
      try {
        const userCoins = await getFavorateCoins();
        setWatchList(userCoins);
      } catch (error) {
        console.error("Error fetching user coins:", error);
      }
    };
    fetchUserCoins();
  }, []);

  const getData = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );

      if (response && response.data) {
        const allCoins = response.data;
        console.log("All coins fetched:", allCoins);

        const filteredCoins = allCoins.filter((coin) => watchlist.includes(coin.id));
        setCoins(filteredCoins);

        console.log("Filtered coins:", filteredCoins);
      } else {
        console.warn("No data received from the API.");
      }

      console.log("Watchlist:", watchlist);
    } catch (error) {
      if (error.response && error.response.status === 429 && retryCount < 3) {
        // Exponential backoff retry mechanism
        const retryAfter = (2 ** retryCount) * 1000; // 1s, 2s, 4s
        console.log(`Retrying after ${retryAfter / 1000} seconds...`);
        setTimeout(() => getData(retryCount + 1), retryAfter);
      } else {
        console.error("Error fetching coins:", error);
      }
    } finally {
      setLoading(false); // End loading
    }
  }, [watchlist]);

  useEffect(() => {
    if (watchlist.length > 0) {
      getData(); // Initial fetch
      localStorage.setItem("coinsQty", watchlist.length);
      const interval = setInterval(() => {
        getData();
      }, 60000); // Refresh every 60 seconds

      return () => clearInterval(interval); // Clear interval on component unmount
    } else {
      setLoading(false); // No watchlist, no loading
    }
  }, [watchlist, getData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {watchlist.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorates;
