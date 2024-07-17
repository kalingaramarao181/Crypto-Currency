import React, { useState } from "react";
import "./styles.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { motion } from "framer-motion";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
import StarIcon from "@mui/icons-material/Star";
import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";
import { saveItemToUserDB } from "../../../functions/saveItemToUserDB";
import Cookies from "js-cookie"

function Grid({ coin, delay }) {
  const currentPath = window.location.pathname;
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));
  const [graphView, setGraphView] = useState(true);
  const userToken = Cookies.get("userToken");
  const sidebarStatus = localStorage.getItem("sidebarStatus");

  // Safely parse userData from cookies
  const userData = JSON.parse(Cookies.get("userData") || "null");

  // Conditionally set coinPath based on userData existence
  const coinPath = sidebarStatus === "Home" && userData && `/coin/${coin.id}`;

  const onClickView = () => {
    localStorage.setItem("sidebarStatus", "TradeCoins");
    localStorage.setItem("coinId", coin.id);
    window.location.reload();
  };

  return (
    <>
      <a href={coinPath}>
        <motion.div
          className={`grid ${coin.price_change_percentage_24h < 0 && "grid-red"}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay }}
          style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginRight: "1vw", backgroundColor: "white", transform: "scale(1.5)" }}
        >
          <div className="img-flex">
            <img alt="coinImage" src={coin.image} className="coin-image" />
            <div className="icon-flex">
              <div className="info-flex">
                <p className="coin-symbol">{coin.symbol}</p>
                <p className="coin-name">{coin.name}</p>
              </div>
              {currentPath === "/user-dashboard" && <div
                className={`watchlist-icon ${coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                  }`}
                onClick={(e) => {
                  if (isCoinAdded) {
                    // remove coin
                    removeItemToWatchlist(e, coin.id, setIsCoinAdded);
                  } else {
                    setIsCoinAdded(true);
                    saveItemToWatchlist(e, coin.id);
                  }
                }}
              >
                {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
              </div>}
            </div>
          </div>
          {coin.price_change_percentage_24h >= 0 ? (
            <div className="chip-flex">
              <div className="price-chip">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="chip-icon">
                <TrendingUpRoundedIcon />
              </div>
            </div>
          ) : (
            <div className="chip-flex">
              <div className="price-chip red">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="chip-icon red">
                <TrendingDownRoundedIcon />
              </div>
            </div>
          )}
          {coin.price_change_percentage_24h >= 0 ? (
            <p className="current-price">
              ${coin.current_price.toLocaleString()}
            </p>
          ) : (
            <p className="current-price-red">
              ${coin.current_price.toLocaleString()}
            </p>
          )}
          <p className="coin-name">
            Total Volume : {coin.total_volume.toLocaleString()}
          </p>
          <p className="coin-name">
            Market Capital : ${coin.market_cap.toLocaleString()}
          </p>
          {sidebarStatus === "Home" && currentPath === "/user-dashboard" && <button onClick={() => setGraphView(false)} className={`trd-button ${coin.price_change_percentage_24h < 0 && "trd-button-red"}`}>Trade</button>}
          {currentPath === `/dashboard` && userToken && <button className={`trd-button ${coin.price_change_percentage_24h < 0 && "trd-button-red"}`} onClick={(e) => saveItemToUserDB(e, coin.id, userData)}>Add</button>}
          {sidebarStatus === "Favorates" && currentPath === "/user-dashboard" && <button onClick={() => onClickView()} className={`trd-button ${coin.price_change_percentage_24h < 0 && "trd-button-red"}`}>View</button>}
        </motion.div>
      </a>
    </>
  );
}

export default Grid;
