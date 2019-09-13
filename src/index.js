import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Web3Context from './Web3Context';
import App from './App';
import * as serviceWorker from './serviceWorker';

let currentProvider;

if (typeof window.ethereum !== 'undefined'
|| (typeof window.web3 !== 'undefined')) {

  // Web3 browser user detected. You can now use the provider.
  currentProvider = window['ethereum'] || window.web3.currentProvider;
  currentProvider.autoRefreshOnNetworkChange = false;
  currentProvider.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
  });

} else {
  currentProvider = undefined;
}

ReactDOM.render(
  <Web3Context.Provider value={currentProvider}>
    <App />
  </Web3Context.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
