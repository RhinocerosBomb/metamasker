import React, { useState, useEffect, useReducer, useMemo} from 'react';
import { ethers } from 'ethers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import loader from '../resources/loader.svg';
import EthersContext from '../context/EthersContext';
import StoreContext from '../context/StoreContext';
import UserReducer from '../reducers/UserReducer';
import Logo from './Logo';
import TopBar from './TopBar';
import CryptoTracker from './CryptoTracker';
import MetaMask from './MetaMask';
import WalletManager from './WalletManager';
import Settings from './Settings';
import About from './About';


const logoProps = {
  pxNotRatio: true,
  width: 300,
  height: 300,
  // pxNotRatio: false,
  // width: 0.9,
  // height: 0.9,

  // To make the face follow the mouse.
  followMouse: true,

  // head should slowly drift (overrides lookAt)
  slowDrift: false
};

const initialState = {
 loggedIn: false,
 settings: {
   cryptoTracker: {
     saveLiveMode: true,
     saveCurrencyState: true,
     saveCryptoCurrencies:true,
     liveMode: false,
     currencyState: {
       currencies: ['USD', 'CAD'],
       activeCurrency: 'USD'
     },
     cryptoCurrencies: ['BTC', 'ETH', 'LTC', 'BAT']
   },
 }
};

function App() {
  const [provider, setProvider] = useState(window.ethereum || null);
  const [account, setAccount] = useState(
    provider ? provider.selectedAddress : null
  );
  const [network, setNetwork] = useState(
    provider ? provider.networkVersion : null
  );
  const [wallets, setWallets] = useState([]);
  const [enabled, setEnabled] = useState(false);

  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    let web3Provider;
    if (
      typeof window.ethereum !== 'undefined' ||
      typeof window.web3 !== 'undefined'
    ) {
      web3Provider = window['ethereum'] || window.web3.currentProvider;
      // Web3 browser user detected. You can now use the provider.
      web3Provider.autoRefreshOnNetworkChange = false;

      web3Provider.on('accountsChanged', account => {
        if (account.length === 0) {
          setEnabled(false);
        }
        setAccount(account[0]);
      });

      web3Provider.on('networkChanged', network => {
        setNetwork(network);
      });
      connectWithUser();
    }

    if (provider !== web3Provider) setProvider(web3Provider);
  }, [enabled]);

  const connectWithUser = () => {
    provider
      .enable()
      .catch(reason => {
        if (reason === 'User rejected provider access') {
          alert(':(');
        } else {
          alert('There was an issue signing you in.');
        }
      })
      .then((account) => {
        if(enabled) {
          setAccount(account[0]);
          setNetwork(provider.networkVersion);
        } else {
          setEnabled(true);
        }
      });
  };

  return (
    <StoreContext.Provider value={useMemo(() => ({ state, dispatch }), [state, dispatch])}>
      <EthersContext.Provider
      value={{
        provider: provider ? new ethers.providers.Web3Provider(provider) : null,
        account: account,
        network,
        wallets
      }}
      >
        <Router>
          <div className="App">
          {!account && (
            <div className="landing">
            <Logo {...logoProps} />
            {provider && provider.isMetaMask && (
              <div>
                <button>
                  <h1 onClick={connectWithUser}>Log In</h1>
                </button>
              </div>
            )}
            {(!provider || !provider.isMetaMask) && (
              <div>
                <p>You do not have Metamask installed</p>
                  <a
                  href="https://metamask.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  Metamask
                  </a>
              </div>
            )}
            </div>
          )}
          {account && !enabled && (
            <div className="landing">
              <img src={loader} style={{ margin: '10px' }} alt="loading" />
            </div>
          )}
          {account && enabled && (
            <div className="main">
            <TopBar />
            <Switch>
              <Route exact path="/">
                <div className="pageRow first">
                  <CryptoTracker />
                  <MetaMask />
                </div>
                <div className="pageRow second">
                  <WalletManager setWallets={setWallets} />
                </div>
              </Route>
              <Route exact path="/Settings">
                <Settings/>
              </Route>
              <Route exact path="/About">
                <About/>
              </Route>

            </Switch>
            </div>
          )}
          </div>
        </Router>
      </EthersContext.Provider>
    </StoreContext.Provider>
  );
}

export default App;
