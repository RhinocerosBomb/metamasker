import React, {useState, useContext} from 'react';
import {ethers} from 'ethers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faTimes } from '@fortawesome/free-solid-svg-icons';
import EthersContext from './EthersContext';

import './WalletManager.css';

const defaultWalletFields = {name: '', privateKey: ''}
function WalletManager({setWallets}) {
  const [walletFields, setWalletFields] = useState(defaultWalletFields);
  const {provider, wallets} = useContext(EthersContext);

  const addWallet = () => {
    if(ethers.utils.isHexString(walletFields.privateKey) &&
    ethers.utils.hexDataLength(walletFields.privateKey) === 32 &&
    !wallets.some(wallet => wallet.name === walletFields.name)
  ) {
      let wallet = new ethers.Wallet(walletFields.privateKey, provider);
      setWallets(wallets.concat({name: walletFields.name, wallet}));
      setWalletFields(defaultWalletFields);
    }
  }

  const deleteWallet = (i) => {
    setWallets([...wallets.slice(0,i), ...wallets.slice(i+1)]);
  }

  return (
    <div className="walletManager">
      <div className="walletFields">
        <label>
          Name:
          <input type="text" value={walletFields.name} onChange={e => setWalletFields({...walletFields, name: e.target.value})}/>
        </label>
        <label>
          Private Key:
          <input type="text" value={walletFields.privateKey} onChange={e => setWalletFields({...walletFields, privateKey: e.target.value})}/>
        </label>
        <button onClick={() => addWallet()}>Add</button>
      </div>
      <div className="wallets">
      { wallets.map((wallet, i) => (
        <div className="wallet" key={i}>
          <span onClick={() => deleteWallet(i)}><FontAwesomeIcon icon={faTimes}/></span>
          <FontAwesomeIcon icon={faWallet} size="lg"/>
          {wallet.name}
        </div>
      ))}
      </div>
    </div>
  );
}

export default WalletManager;
