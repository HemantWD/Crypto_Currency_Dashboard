import constants  from "../Constant/constants";

const initialState = {
    name: "Crypto Dashboard",
    coinList: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.COIN_API:
            return {
                ...state, coinList: action.payload, page: action.payload
            }
        case constants.COIN_API_ERR:
            alert(action.payload)
            return state

        default: return state
    }
}

export default reducer;