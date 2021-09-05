import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import "bootstrap/dist/css/bootstrap.min.css"
import './normalize.css'
import './index.css';

import { Provider } from 'react-redux';
import { store } from './Redux/Store/Store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);