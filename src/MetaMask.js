//rename later
import React, {useState, useEffect, useContext} from 'react';
import {ethers} from 'ethers';

import WalletChooser from './WalletChooser';
import etherLogo from './resources/EtherLogo.svg';
import './MetaMask.css';
import EthersContext from './EthersContext';

function MetaMask() {
  const {provider, account, network, wallets} = useContext(EthersContext);
  const [logs, setLogs] = useState([]);
  const [balance, setBalance] = useState();
  const [transactionTo, setTransactionTo] = useState('');
  const [transactionAmount, setTransactionAmount] = useState('');
  const [activeTab, setActiveTab] = useState('logs');
  const [activeWallet, setActiveWallet] = useState();
  const [showWalletChooser, setShowWalletChooser] = useState(false);

  useEffect(() => {
    if (provider) {
      provider.getBalance(account).then(newBalance => {
        setBalance(ethers.utils.formatEther(newBalance));
      });
      // provider.getLogs().then(newLogs => setLogs(logs));
    }
  }, [provider, account, network]);

  useEffect(() => {
    if (wallets.indexOf(activeWallet) === -1) {
      setActiveWallet();
    }
  }, [wallets, activeWallet]);

  const switchTabs = val => {
      if(val !== activeTab) {
        setActiveTab(val);
      }
  }

  const selectedWallet = selectedWallet => {
    setActiveWallet(selectedWallet);
    setShowWalletChooser(false);
  }

  const makeTransaction = () => {
      activeWallet.wallet.sendTransaction({
        to: transactionTo,
        value: ethers.utils.parseEther(transactionAmount)
      }).then(data => {
        console.log(data);
      }).catch(err => {
        console.log(err);
      });
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
          <div></div>
        }
        { activeTab === 'transfer' && activeWallet &&
          <div>
          <div onClick={() => setShowWalletChooser(true)}>
            Switch Wallets
          </div>
            <label>
            Transfer To
            <input type="text" value={transactionTo} onChange={e => setTransactionTo(e.target.value)}/>
            </label>
            <label>
            Amount
            <input type="number" value={transactionAmount} onChange={e => setTransactionAmount(e.target.value)}/>
            </label>
            <button onClick={makeTransaction}>Send</button>
          </div>
        }
        { activeTab === 'transfer' && !activeWallet &&
          <div onClick={() => setShowWalletChooser(true)}>Choose a wallet</div>
        }
      </div>
      <WalletChooser
        activeWallet={activeWallet}
        show={showWalletChooser}
        selectWallet={selectedWallet}
        close={() => setShowWalletChooser(false)}
        onClose={() => setShowWalletChooser(false)}
      />
    </div>
  );
}


export default MetaMask;
