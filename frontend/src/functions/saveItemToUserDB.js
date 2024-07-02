import { toast } from "react-toastify";
import axios from "axios";
import baseUrl from "../components/config";

export const saveItemToUserDB = async (e, id, userData) => {
    if (e) e.preventDefault();
    try {
        await axios.post(`${baseUrl}user-coin/${id}`, {userData});
        toast.success(
            `${id.charAt(0).toUpperCase() + id.slice(1)} - added to the ${userData.firstname} list`
        );
    } catch (error) {
        if (error.response && error.response.status === 409) {
            toast.error(
                `${id.charAt(0).toUpperCase() + id.slice(1)} - is already added to the watchlist!`
            );
        } else {
            toast.error("An error occurred while adding to the watchlist.");
        }
    }
};
