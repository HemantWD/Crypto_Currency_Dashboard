import constants  from "../Constant/constants";

const initialState = {
    name: "Crypto Exchange",
    coinList: []
}

const exchangeReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.EXCHANGE_SUCCESS:
            return {
                ...state, coinList: action.payload
            }
        case constants.EXCHANGE_ERROR:
            alert(action.payload)
            return state

        default: return state

    }
}

export default exchangeReducer;