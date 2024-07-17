import React, { useEffect, useState, useCallback, useRef } from "react";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import { get100Coins } from "../functions/get100Coins";
import Loader from "../components/Common/Loader";

function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetchedData = useRef(false);

  const getData = useCallback(async (retryCount = 0) => {
    try {
      setLoading(true); // Start loading
      const allCoins = await get100Coins();

      if (allCoins) {
        setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
      }
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
    if (watchlist && watchlist.length > 0 && !hasFetchedData.current) {
      getData();
      hasFetchedData.current = true;
    } else {
      setLoading(false);
    }
  }, [watchlist, getData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
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

export default Watchlist;
