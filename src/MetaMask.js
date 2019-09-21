//rename later
import React, {useState, useEffect, useContext} from 'react';
import {ethers} from 'ethers';

import etherLogo from './resources/EtherLogo.svg';
import './MetaMask.css';
import EthersContext from './EthersContext';

function MetaMask() {
  const {provider, account, network} = useContext(EthersContext);
  const [logs, setLogs] = useState([]);
  const [balance, setBalance] = useState();
  const [privateKeyFrom, setprivateKeyFrom] = useState('');
  const [privateKeyTo, setprivateKeyTo] = useState('');
  const [activeTab, setActiveTab] = useState('logs');
  const [wallets, setWallet] = useState([]);
  useEffect(() => {
    if (provider) {
      provider.getBalance(account).then(newBalance => {
        setBalance(ethers.utils.formatEther(newBalance));
      });
      // provider.getLogs().then(newLogs => setLogs(logs));
    }
  }, [account, network]);

  const switchTabs = val => {
      if(val !== activeTab) {
        setActiveTab(val);
      }
  }

  return(
    <div className="MetaMask">
      <div className="center">
        <img className="etherLogo" src={etherLogo} alt="ether logo" />
      </div>
      <div className="center">
        {balance} ETH
      </div>
      <ul>
        <li className="navItem" onClick={() => switchTabs('logs')}>Logs</li>
        <li className="navItem" onClick={() => switchTabs('transfer')}>Transfer</li>
      </ul>
      <div>
        { activeTab === 'logs' &&
          <div>
          </div>
        }
        { activeTab === 'transfer' &&
          <div>
            <label>
            Transfer From
            <input type="text" onChange={(e) => setprivateKeyFrom(e.target.value)} value={privateKeyFrom}/>
            </label>
            <label>
            Transfer To
            <input type="text"/>
            </label>
            <label>
            Amount
            <input type="number"/>
            </label>
            <button>Send</button>
          </div>
        }
      </div>
    </div>
  );
}


export default MetaMask;
