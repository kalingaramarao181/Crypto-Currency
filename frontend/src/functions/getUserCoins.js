import axios from "axios";
import baseUrl from "../components/config";
import Cookies from "js-cookie"

export const getUserCoins = () => {
  const userMail = JSON.parse(Cookies.get("userData"))[0].email
  const coins = axios
    .get(
      `${baseUrl}user-coins/${userMail}`
    )
    .then((response) => {
        console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("ERROR>>>", error.message);
    });

  return coins;
};
