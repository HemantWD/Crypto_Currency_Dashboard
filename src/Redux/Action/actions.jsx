import axios from "axios";
import constants from "../Constant/constants";

export const fetchCoinList = () => {
    return (dispatch) => {
        axios.get('https://api.coingecko.com/api/v3/exchange_rates')
            .then(response => {
                const data = response.data
                dispatch({
                    type: constants.EXCHANGE_SUCCESS,
                    payload: data
                })
            })
            .catch(error => {
                const msg = error.message
                dispatch({
                    type: constants.EXCHANGE_ERROR,
                    payload: msg
                })
            })
    }
}


export default { fetchCoinList}