import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store, persistor} from './store/store.js'
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import createCache from "@emotion/cache";
import {CacheProvider} from "@emotion/react";

const cache = createCache({
    key: 'css',
    prepend: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CacheProvider value={cache}>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
    </CacheProvider>
);
