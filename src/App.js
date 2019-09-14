import React, {useState, useEffect, useContext} from 'react';
import Web3Context from './Web3Context';
import Logo from './Logo';
import TopBar from './TopBar';
import Currencies from './Currencies';
import './App.css';

function App() {
  const provider = useContext(Web3Context);
  const [account, setAccount] = useState(provider.selectedAddress);
  const [network, setNetwork] = useState(provider.networkVersion);

  provider.on('accountsChanged', (account) => {
    setAccount(account);
  });

  provider.on('netWorkChanged', (network) => {
    setNetwork(network);
  });

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

  return (
    <div className="App">
      { !account &&
        <header>
          <Logo {...logoProps}/>
          { (provider && provider.isMetaMask) &&
            <h1>Log In</h1>
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
          <TopBar address={account} network={network}/>
          <Currencies />
        </div>
      }
    </div>
  );
}

export default App;
