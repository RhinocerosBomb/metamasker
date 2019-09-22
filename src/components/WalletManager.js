import React, {useState, useContext} from 'react';
import {ethers} from 'ethers';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faTimes } from '@fortawesome/free-solid-svg-icons';
import EthersContext from '../context/EthersContext';

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
      <div><h3>Wallet Manager</h3></div>
      <div className="walletFields">
        <div className="inputBox walletField">
          Name
          <input type="text" value={walletFields.name} onChange={e => setWalletFields({...walletFields, name: e.target.value})}/>
          <hr />
        </div>
        <div className="inputBox walletField">
          Private Key
          <input type="text" value={walletFields.privateKey} onChange={e => setWalletFields({...walletFields, privateKey: e.target.value})}/>
          <hr />
        </div>
        <div className="addWalletBtn">
          <button onClick={() => addWallet()}>Add</button>
        </div>
      </div>
      <div className={classNames({wallets: true, justifyCenter: !wallets.length})}>
      { !wallets.length &&
        <div>You Have No Wallets</div>
      }
      { wallets.map((wallet, i) => (
        <div className="wallet" key={i}>
          <span className="times" onClick={() => deleteWallet(i)}><FontAwesomeIcon icon={faTimes}/></span>
          <FontAwesomeIcon icon={faWallet} size="3x"/>
          {wallet.name}
        </div>
      ))}
      </div>
    </div>
  );
}

export default WalletManager;
