import { Link } from "react-router-dom"
import "./index.css"
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userToken = Cookies.get("userToken")
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") == "dark" ? true : false
  );

  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
      setDark();
    } else {
      setLight();
    }
  }, []);

  const changeMode = () => {
    if (localStorage.getItem("theme") != "dark") {
      setDark();
    } else {
      setLight();
    }
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const logoutButton = () => {
    Cookies.remove("userToken")
    Cookies.remove("userData")
    navigate("/login", { replace: true });
  }

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };
  return (
    <div className="header">
      <div className="header-container1">
        <Link to="/"><img className="header-image" src="/Images/logo.png" alt="logo" /></Link>
        <div>
          <Link to="/"><button className="header-button">Homepage</button></Link>
          <Link to="/watchlist"><button className="header-button">Watch List</button></Link>
          <Link to="/dashboard"><button className="header-button">User DB</button></Link>
          <button className="header-button">Sell Crypto</button>
          <button className="header-button">Blog</button>
          {userToken === undefined ? <Link to="/login"><button className="header-button">Login</button></Link> : <button onClick={logoutButton} className="header-button">Logout</button>}

        </div>
      </div>
      <div>
        <Switch sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: 'white', // Thumb color when checked
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'white', // Track color when checked
          },
          '& .MuiSwitch-switchBase': {
            color: 'white', // Thumb color when unchecked
          },
          '& .MuiSwitch-switchBase + .MuiSwitch-track': {
            backgroundColor: 'grey', // Track color when unchecked
          },
        }} checked={darkMode} onClick={() => changeMode()} />
        <Link to={userToken !== undefined ? "/user-dashboard" : "/dashboard"}>
          <button className="header-button1">Dashboard</button>
        </Link>
      </div>
    </div>
  )
}

export default Header