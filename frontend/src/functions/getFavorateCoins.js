import axios from "axios";
import baseUrl from "../components/config";
import Cookies from "js-cookie"

export const getFavorateCoins = () => {
  const userMail = JSON.parse(Cookies.get("userData"))[0].email
  const coins = axios
    .get(
      `${baseUrl}user-favorate-coins/${userMail}`
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
