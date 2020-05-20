import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StoreContext from './StoreContext';
import {RootStore} from "./models/RootStore";
import {data} from "./InitialData";

const rootStore = RootStore.create(data);

ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={rootStore}>
            <App/>
        </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);