import React, {useEffect, useState} from 'react';
import axios from 'axios';
import baseUrl from '../config';
import Cookies from "js-cookie"
import './index.css';

const UserProfile = () => {
    const userData = JSON.parse(Cookies.get("userData"))[0]
    const [label, setLabel] = useState("")
    const coinsQty = localStorage.getItem("coinsQty")
    const {firstname, lastname, email, location, phoneno} = userData

    useEffect(() => {
        axios.get(`${baseUrl}label`, { params: {
          user: email,
          coinId: "bitcoin"
        }}).then((res)=> {
          setLabel(res.data);
          console.log(res.data);
        }).catch(err => {
          console.log(err);
        });
      }, []);

    const openCoins = (status) => {
        localStorage.setItem("sidebarStatus", status)
        window.location.reload()
    }
    
    return (
        <div className="p-dashboard">
            <header>
                <h1>My Dashboard</h1>
            </header>
            <div className="p-content">
                <section className="p-profile">
                    <h2>My profile</h2>
                    <div className="profile-info">
                        <img src="/images/user-profile.jpeg" className='user-photo' alt="Sami" />
                        <div className="p-profile-details">
                            <p>{firstname} {lastname}</p>
                            <p>{phoneno}</p>
                            <p>{email}</p>
                            <p>{location}</p>
                            <div className="p-sms-alerts">
                                <p>SMS alerts activation</p>
                                <span className="p-dot active"></span>
                            </div>
                            <button className="p-save-btn">Save</button>
                        </div>
                    </div>
                </section>
                <div className='section-2'>
                    <section className="p-xpay-accounts">
                        <h2>My Trade Coins</h2>
                        <div className="p-account">
                            <p>Active coins</p>
                            <p>{coinsQty}</p>
                            <button onClick={() => openCoins("Favorates")} className="p-block-btn">Open coins</button>
                        </div>
                        <div className="p-account">
                            <p>Account Id</p>
                            <p>113{firstname.toUpperCase()}45{lastname.toUpperCase()}</p>
                            <button className="p-unblock-btn">Block Account</button>
                        </div>
                    </section>
                    <section className="p-bills">
                        <h2>Payment Details</h2>
                        <div className="p-bill">
                            <p>Bill paid</p>
                            <span className="p-status p-paid">$0</span>
                        </div>
                        <div className="p-bill">
                            <p>Withdrawl money</p>
                            <span className="p-status p-not-paid">0$</span>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
