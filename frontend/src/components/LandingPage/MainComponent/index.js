import "./styles.css"
import { MdCurrencyExchange } from "react-icons/md";
import { FcCurrencyExchange } from "react-icons/fc";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { PiCurrencyBtcFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [cryptoData, setCryptoData] = useState([])

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then(res => {
                setCryptoData(res.data)
            }).catch(err => {
                console.log(err);
            })
    }, [])

    const coinCardsList = [
        {
            id: 1,
            icon: MdCurrencyExchange,
            name: "Bitcoin",
            rate: "USD 46,168.95",
            subRate: "36,641.20",
            persentage: -0.79,
            subName: "BTC/USD"
        },
        {
            id: 2,
            icon: FcCurrencyExchange,
            name: "Ethereum",
            rate: "USD 46,168.95",
            subRate: "36,641.20",
            persentage: 9.70,
            subName: "ETH/USD"
        }, {
            id: 3,
            icon: HiOutlineCurrencyRupee,
            name: "Tether",
            rate: "USD 46,168.95",
            subRate: "36,641.20",
            persentage: -0.79,
            subName: "USDT/USD"
        }, {
            id: 4,
            icon: PiCurrencyBtcFill,
            name: "BNB",
            rate: "USD 46,168.95",
            subRate: "36,641.20",
            persentage: 5.68,
            subName: "BNB/USD"
        },
    ]

    const workStatus = [
        {
            id: 1,
            step: "STEP 1",
            name: "Download",
            descreption: "Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.",
            image: "/Images/instruction-1.png"
        },
        {
            id: 2,
            step: "STEP 2",
            name: "Connect Wallet",
            descreption: "Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.",
            image: "/Images/instruction-2.png"
        },
        {
            id: 3,
            step: "STEP 3",
            name: "Start Trading",
            descreption: "Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.",
            image: "/Images/instruction-3.png"
        },
        {
            id: 4,
            step: "STEP 4",
            name: "Earn Money",
            descreption: "Stacks Is A Production-Ready Library Of Stackable Content Blocks Built In React Native.",
            image: "/Images/instruction-4.png"
        },
    ]
    return (
        <div className="main-container">
            <div className="home-sec1-container">
                <div className="home-text-container">
                    <h1 className="home-header">Buy & Sell Digital Assets In The <spam className="header-span">Deazi<br /> Cepital</spam></h1>
                    <p className="home-desc">Coin <spam className="header-span">Deazi Cepital</spam> is the easiest, safest, and fastest way to<br /> buy & sell crypto asset exchange.</p>
                    <Link to="/dashboard"><button className="home-button">Get Started now</button></Link>
                </div>
                <img className="home-image" src="/Images/hero-bit2me-EN.webp" alt="HomeImage" />
            </div>
            <div className="home-cards-container">
                <div className="home-cards-header">
                    <button className="home-cards-header-button1">Crypto</button>
                    <button className="home-cards-header-button">DeFi</button>
                    <button className="home-cards-header-button">BSC</button>
                    <button className="home-cards-header-button">NFT</button>
                    <button className="home-cards-header-button">Metaverse</button>
                    <button className="home-cards-header-button">Polkadot</button>
                    <button className="home-cards-header-button">Solana</button>
                    <button className="home-cards-header-button">Opensea</button>
                    <button className="home-cards-header-button">Makersplace</button>
                </div>
                <hr />
                <ul className="cards-list">
                    {coinCardsList.map(each => (
                        <li className="card">
                            <div className="card-top">
                                <each.icon className="card-icon" />
                                <p className="card-name">{each.name}<span className="card-subrate">{each.subName}</span></p>
                            </div>
                            <p className="card-rate">{each.rate}</p>
                            <div className="card-bottom">
                                <p className="card-subrate">{each.subRate}</p>
                                <p style={{ backgroundColor: 0 <= each.persentage ? "green" : "red" }} className="card-percentage">{each.persentage}%</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="home-section-2">
                <div className="home-section-2-top">
                    <h1 className="home-section-2-title">Market Update</h1>
                    <Link to="dashboard"><button className="home-section-2-button">See All Coins</button></Link>
                </div>
                <div className="home-cards-header-2">
                    <button className="home-coins-header-button1">View All</button>
                    <button className="home-coins-header-button">Metaverse</button>
                    <button className="home-coins-header-button">Entertainment</button>
                    <button className="home-coins-header-button">Energy</button>
                    <button className="home-coins-header-button">NFT</button>
                    <button className="home-coins-header-button">Gaming</button>
                    <button className="home-coins-header-button">Music</button>
                </div>
                <table className="home-section-2-table">
                    <tr>
                        <th className="home-section-2-th">S No</th>
                        <th className="home-section-2-th">Name</th>
                        <th className="home-section-2-th">Last Price</th>
                        <th className="home-section-2-th">24h %</th>
                        <th className="home-section-2-th">Market Cap</th>
                        <th className="home-section-2-th"></th>
                    </tr>
                    {cryptoData.map((each, index) => {
                        return (
                            <tr key={index}>
                                <td className="home-section-2-td">{index + 1}</td>
                                <td className="home-section-2-td-img-cont"><img className="home-section-2-td-img" alt={"coin" + index} src={each.image} />{each.name}</td>
                                <td className="home-section-2-td">{each.current_price.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}</td>
                                <td className="home-section-2-td" style={{ color: each.ath_change_percentage < 0 ? "red" : "green" }}>{each.ath_change_percentage.toFixed(2)}%</td>
                                <td className="home-section-2-td">{each.total_volume.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}</td>
                                <td className="home-section-2-td"><Link to={`/coin/${each.id}`}><button className="home-section-2-td-button">Trade</button></Link></td>
                            </tr>
                        )
                    })}

                </table>
            </div>
            <div className="home-section-3">
                <h1 className="home-section-3-head">How It Work</h1>
                <p className="home-section-3-desc">Stacks is a production-ready library of stackable content blocks built in React Native.</p>
                <ul className="home-section-3-cards">
                    {workStatus.map((each, index) => (
                        <li className="home-section-3-card" key={index}>
                            <img className="home-section-3-card-img" src={each.image} alt={"img"+index} />
                            <p className="home-section-3-card-sub-head">{each.step}</p>
                            <h1 className="home-section-3-card-head">{each.name}</h1>
                            <p className="home-section-3-card-desc">{each.descreption}</p>
                        </li>
                    ))}       
                </ul>
            </div>
        </div>
    )
}

export default Home