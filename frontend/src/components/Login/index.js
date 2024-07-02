import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import Cookies from 'js-cookie'
import baseUrl from "../config";
import Header from "../Common/Header";
import { Link } from "react-router-dom";
import UserDashboard from "../UserDashboard";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
    const navigate = useNavigate();
    const userToken = Cookies.get("userToken")
    const [errorMessage, setErrorMessage] = useState()
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = data;
    const changehandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const submithandler = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}login`, { ...data })
            .then((res) => {
                if (res.statusText === "OK"){
                Cookies.set("userToken", res.data.jwtToken, {expires: 1/24})
                Cookies.set("userData", JSON.stringify(res.data.data))
                navigate("/user-dashboard", { replace: true });
                }
            })
            .catch((error) => {
                if (error.response) {
                    console.log('Server responded with status code:', error.response.status);
                    if (error.response.status === 400) {
                      // Handle 400 Bad Request (e.g., display error message to user)
                      setErrorMessage(error.response.data.error);
                    } else {
                      // Handle other status codes
                      setErrorMessage('Unexpected error:', error.response.data.error);
                    }
                  } else if (error.request) {
                    // The request was made but no response was received
                    setErrorMessage('No response received from server');
                  } else {
                    // Something happened in setting up the request that triggered an error
                    setErrorMessage('Error setting up request:', error.message);
                    console.log(error);
                  }
            });
        setData({
            username: "",
            password: "",
        })
    };
    return (
        
        <>
        <Header />
            <div className="admin-main-container">
                <form className="admin-container" onSubmit={submithandler}>
                    <h1 className="admin-login-heading">Login</h1>
                    <label className="admin-labels">UserName</label>
                    <input
                        type="text"
                        className="admin-input"
                        placeholder="Enter Your UserName"
                        name="username"
                        value={username}
                        onChange={changehandler}
                        required
                    />
                    <label className="admin-labels">Password</label>
                    <input
                        type="password"
                        className="admin-input"
                        placeholder="Enter Your Password"
                        name="password"
                        value={password}
                        onChange={changehandler}
                        required
                    />
                    <input type="submit" className="admin-submit" />
                    {errorMessage && <p className="login-error-message">{errorMessage}</p>}
                    <Link state={{color: "blue"}} className="signup-button" to="/regester">Signup</Link>
                </form>
                
            </div>
        </>
    );
};

export default Login;
