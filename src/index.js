import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { reduxStore, ReduxStoreStartup } from './Store/index';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const root = ReactDOM.createRoot(document.getElementById('root'));
const initialOptions = {
  "client-id": process.env.NODE_ENV === 'development' ? 'AU5x1CmyyI8AFq7JssxT4UpmDjj1T-SNzhsGkEUs0bpDl89lD3T0YpbzOsPSApY33U-Z1QoTjIpLR7Xm' : 'Aaw7unfKIH7zTVhX42PmqrmxkVXITXeQeBTqE3yZaed4ziMwTC-IY_IdMsfug39gUTic8JqC7hjPdHmo',
  currency: "CAD",
  intent: "capture",
};

root.render(
  <React.StrictMode>
    <PayPalScriptProvider deferLoading={true} options={initialOptions}>
      <Provider store={reduxStore}>
        <ReduxStoreStartup />
        <App />
      </Provider>
    </PayPalScriptProvider>
  </React.StrictMode>
);