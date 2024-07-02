import { toast } from "react-toastify";
import axios from "axios";
import baseUrl from "../components/config";

export const saveCoinDataToDB = async (e, id, chartData, userMail) => {
    console.log(chartData);
    const lastLabel = chartData.labels[chartData.labels.length - 1]
    const lastData = chartData.datasets[0].data[chartData.datasets[0].data.length - 1]
    const data = {lastLabel, lastData, userMail}
    if (e) e.preventDefault();
    try {
        await axios.post(`${baseUrl}user-coin-to/${id}`, {data});
        toast.success(
            `${id.charAt(0).toUpperCase() + id.slice(1)} - added to the list`
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
