import React from "react";
import { Provider } from "react-redux";
import Main from './components/Main';
import store from '../src/Redux/store';
import { CryptoProvider } from './Context/Context';

function App() {
  return (
    
    <Provider store={store}>
      <CryptoProvider >
        <Main />
      </CryptoProvider>
    </Provider>


  );
}

export default App;
