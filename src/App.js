import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import Web3Context from './Web3Context';
import Logo from './Logo';
import TopBar from './TopBar';
import Currencies from './Currencies';
import MetaMask from './MetaMask';
import './App.css';

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
  slowDrift: false,
};

function App() {
  const [provider, setProvider] = useState(window.ethereum || null);
  const [account, setAccount] = useState(provider ? provider.selectedAddress : null);
  const [network, setNetwork] = useState(provider ? provider.networkVersion : null);

  useEffect(() => {
    let web3Provider;
    if (typeof window.ethereum !== 'undefined'
    || (typeof window.web3 !== 'undefined')) {
      web3Provider = window['ethereum'] || window.web3.currentProvider;
      // Web3 browser user detected. You can now use the provider.
      web3Provider.autoRefreshOnNetworkChange = false;

      web3Provider.on('accountsChanged', account => {
        setAccount(account);
      });

      web3Provider.on('networkChanged', network => {
        setNetwork(network);
      });
    }

    if(provider !== web3Provider) setProvider(web3Provider);
  }, []);

  const connectWithUser = () => {
    provider
      .enable()
      .catch(reason => {
        if (reason === 'User rejected provider access') {
        } else {
          alert('There was an issue signing you in.')
        }
      })
      .then(accounts => {
        setAccount(accounts[0]);
      });
  }

  return (
    <Web3Context.Provider
      value={{
        provider: provider ? new ethers.providers.Web3Provider(provider) : null,
        account: account,
        network
      }}>
      <div className="App">
        { !account &&
          <header>
            <Logo {...logoProps}/>
            { (provider && provider.isMetaMask) &&
              <h1 onClick={() => provider.enable()}>Log In</h1>
            }
            { (!provider || !provider.isMetaMask) &&
              <div>
                <p>
                  You do not have Metamask installed
                </p>
                <a
                  href="https://metamask.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Metamask
                </a>
              </div>
            }
          </header>
        }
        { account &&
          <div className="main">
            <TopBar/>
            <Currencies />
            <MetaMask />
          </div>
        }
      </div>
    </Web3Context.Provider>
  );
}

export default App;
