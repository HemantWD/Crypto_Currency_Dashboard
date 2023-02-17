import { combineReducers } from "redux";
import exchangeReducer from "./exchangeReducer";
import reducer from "./reducer";

const rootReducer = combineReducers({
    default: reducer,
    exchange: exchangeReducer
})
export default rootReducer;

