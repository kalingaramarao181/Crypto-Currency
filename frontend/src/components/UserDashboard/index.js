import { useState } from "react"
import "./index.css"
import { TiSocialLinkedin } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialGoogle } from "react-icons/sl";
import Cookies from 'js-cookie'
import Header from "../Common/Header";
import UserWatchlist from "../../pages/UserWatchlist";
import { useNavigate } from "react-router-dom";
import Favorates from "../../pages/Favorates";
import UserCoin from "../../pages/UserCoin";
import UserProfile from "../UserProfile";









const UserDashboard = (props) => {
    const navigate = useNavigate();
    const userData = JSON.parse(Cookies.get("userData"))[0]
    const sidebarButtonStatus = localStorage.getItem("sidebarStatus")
    const onClickLogout = () => {
        Cookies.remove("userToken")
        Cookies.remove("userData")
        navigate("/", { replace: true });
    }

    const setSidebarButtonStatus = (status) => {
        localStorage.setItem("sidebarStatus", status)
        window.location.reload()
    }

    const renderContent = () => {
        if (sidebarButtonStatus === "Home") {
            return <UserWatchlist />
        } else if (sidebarButtonStatus === "Favorates") {
            return <Favorates />
        } else if (sidebarButtonStatus === "TradeCoins") {
            return <UserCoin />
        } else if (sidebarButtonStatus === "UserProfile") {
            return <UserProfile />
        } else if (sidebarButtonStatus === "Admin") {
            return <div className="admin-cards-container">
                <h1 className="admin">User Data</h1>
                <div className='admin-full-container'>
                    <div className='Admin-card1'>
                        <h1>Home</h1>
                        <p>View Home</p>
                        <button className='admin-button-select'>Get Started</button>
                    </div>
                    <div className='Admin-card1'>
                        <h1>Favorates</h1>
                        <p>Check Favorates</p>
                        <button className='admin-button-select'>Get Started</button>
                    </div>
                    <div className='Admin-card1'>
                        <h1>Profile </h1>
                        <p>View All Profile Details</p>
                        <button className='admin-button-select'>Get Started</button>
                    </div>
                </div>
            </div>
        }
    }
    return (
        <>
        <Header />
        <div className="page-container">
            <div className="page-body">
                <div className="admin-sidebar">
                    <div className="admin-buttons-container">
                    <button className="admin-image-botton"  onClick={() => setSidebarButtonStatus("Admin")} >
                        <img className="admin-image" src="https://www.payrollhub.in/static/images/admin.png" />
                        <p className="addmin-button-name">{userData.firstname} {userData.lastname}</p>
                    </button>
                    <div>
                        <button name="Home" style={{backgroundColor:sidebarButtonStatus==="Home" ? "#0E0C49": "rgb(99, 91, 252)" }} onClick={() => setSidebarButtonStatus("Home")} className="admin-sidebar-button">Home</button>
                        <button name="Favorates" style={{backgroundColor:sidebarButtonStatus==="Favorates" ? "#0E0C49": "rgb(99, 91, 252)" }} onClick={() => setSidebarButtonStatus("Favorates")} className="admin-sidebar-button">Favorates</button>
                        <button name="TradeCoines" style={{backgroundColor:sidebarButtonStatus==="TradeCoins" ? "#0E0C49": "rgb(99, 91, 252)" }} onClick={() => setSidebarButtonStatus("TradeCoins")} className="admin-sidebar-button">Trade Coins</button>
                        <button name="UserProfile" style={{backgroundColor:sidebarButtonStatus==="UserProfile" ? "#0E0C49": "rgb(99, 91, 252)" }} onClick={() => setSidebarButtonStatus("UserProfile")} className="admin-sidebar-button">Profile</button>
                    </div>
                    </div>
                    <button onClick={onClickLogout} className="admin-logout-button">Logout</button>
                </div>
                <div className="content">
                    {renderContent()}
                </div>
            </div>
            <div className="page-footer">
                <p style={{color: "white"}} className="contact-us">Contact Us</p>
                <div>
                    <SlSocialFacebook className="social-icon" />
                    <SlSocialInstagram className="social-icon" />
                    <TiSocialTwitter className="social-icon" />
                    <TiSocialLinkedin className="social-icon" />
                    <SlSocialGoogle className="social-icon" />
                </div>
            </div>
        </div>
        </>
    )
}

export default UserDashboard