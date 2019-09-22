//rename later
import React, {useState, useEffect, useContext} from 'react';
import {ethers} from 'ethers';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import WalletChooser from './WalletChooser';
import etherLogo from '../resources/EtherLogo.svg';
import EthersContext from '../context/EthersContext';

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
      provider.getLogs({address: account, toBlock: 6431141, fromBlock: 6431130}).then(newLogs => console.log(logs));
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
      <div className="tabs">
          <span className={classNames({navTab: true, active: activeTab === 'logs'})} onClick={() => switchTabs('logs')}>Logs</span>
          <span className={classNames({navTab: true, active: activeTab === 'transfer'})} onClick={() => switchTabs('transfer')}>Transfer</span>
      </div>
      <div className="logsTransferContainer">
        { activeTab === 'logs' &&
          <div>
            hi
          </div>
        }
        { activeTab === 'transfer' && activeWallet &&
          <div>
          <div onClick={() => setShowWalletChooser(true)}>
            Switch Wallets
          </div>
            <div>
              <label>
                <input type="text" value={transactionTo} onChange={e => setTransactionTo(e.target.value)} placeholder="Transfer to"/>
              </label>
            </div>
            <div>
              <label>
              <input type="number" value={transactionAmount} onChange={e => setTransactionAmount(e.target.value)} placeholder="Amount"/>
              </label>
            </div>
            <button onClick={makeTransaction}>Send</button>
          </div>
        }
        { activeTab === 'transfer' && !activeWallet &&
          <div className="chooseWallet" onClick={() => setShowWalletChooser(true)}>
            <div>
              <FontAwesomeIcon icon={faWallet} size="5x"/>
            </div>
            <div>
              Choose a wallet
            </div>
          </div>
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
