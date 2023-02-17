import thunk from 'redux-thunk';
import rootReducer from './Reducer/rootReducer';
import { applyMiddleware } from "redux";
import { legacy_createStore as createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)))

export default store;