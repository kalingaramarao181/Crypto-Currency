import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/CoinPage/Info";
import LineChart from "../components/CoinPage/LineChart";
import SelectDays from "../components/CoinPage/SelectDays";
import ToggleComponents from "../components/CoinPage/ToggleComponent";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import { getCoinData } from "../functions/getCoinData";
import { getPrices } from "../functions/getPrices";
import { settingCoinObject } from "../functions/settingCoinObject";
import UserLineChart from "../components/CoinPage/UserLineChart";
import axios from 'axios';
import Cookies from "js-cookie";
import baseUrl from "../components/config";

function UserCoin() {
  const id = localStorage.getItem("coinId");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id, days, priceType]);

  const getData = async () => {
    try {
      setLoading(true);
      const coinData = await getCoinData(id, setError);
      console.log("Coin DATA>>>>", coinData);
      settingCoinObject(coinData, setCoin);
      if (coinData) {
        const prices = await getPrices(id, days, priceType, setError);
        if (prices) {
          filterAndSetChartData(prices);
        }
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleDaysChange = async (event) => {
    try {
      setLoading(true);
      setDays(event.target.value);
      const prices = await getPrices(id, event.target.value, priceType, setError);
      if (prices) {
        filterAndSetChartData(prices);
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error("Error fetching prices:", error);
    }
  };

  const handlePriceTypeChange = async (event) => {
    try {
      setLoading(true);
      setPriceType(event.target.value);
      const prices = await getPrices(id, days, event.target.value, setError);
      if (prices) {
        filterAndSetChartData(prices);
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error("Error fetching prices:", error);
    }
  };

  const userData = JSON.parse(Cookies.get("userData"))[0];
  const { email } = userData;

  useEffect(() => {
    axios.get(`${baseUrl}label`, {
      params: {
        user: email,
        coinId: id
      }
    }).then((res) => {
      setLabel(res.data);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const filterAndSetChartData = (data) => {
    // Function to format timestamps
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'};
      return date.toLocaleString('en-US', options);
    };

    // Adjust this based on how your data is structured
    const labels = data.map(item => formatDate(item[0]));
    const datasetData = data.map(item => item[1]);

    const startIndex = labels.indexOf(label && label);

    let filteredLabels = labels;
    let filteredData = datasetData;

    if (startIndex !== -1) {
      filteredLabels = labels.slice(startIndex);
      filteredData = datasetData.slice(startIndex);
    }

    setChartData({
      labels: filteredLabels,
      datasets: [{
        label: "Dataset 1",
        backgroundColor: "rgba(58, 128, 233,0.1)",
        borderColor: "#3a80e9",
        borderWidth: 1,
        data: filteredData,
        fill: true,
        pointRadius: 0,
        tension: 0.25,
        yAxisID: "crypto1"
      }]
    });
  };

  console.log("data1", chartData);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, Couldn't find the coin you're looking for 😞
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
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.5} chartData={chartData} />
          </div>
          <div className="grey-wrapper">
            <SelectDays handleDaysChange={handleDaysChange} days={days} />
            <ToggleComponents
              priceType={priceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <UserLineChart chartData={chartData} />
          </div>
          <Info title={coin.name} desc={coin.desc} />
        </>
      )}
    </>
  );
}

export default UserCoin;
