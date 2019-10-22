import React, { useState, useContext } from 'react';
import { ethers } from 'ethers';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import EthersContext from '../context/EthersContext';
import WalletCreator from './WalletCreator';

function WalletManager({ setWallets }) {
  const [showWalletCreator, setShowWalletCreator] = useState(false);
  const { provider, wallets } = useContext(EthersContext);

  const addWallet = ({ privateKey, name }) => {
    if (
      ethers.utils.isHexString(privateKey) &&
      ethers.utils.hexDataLength(privateKey) === 32 &&
      !wallets.some(wallet => wallet.name === name)
    ) {
      let wallet = new ethers.Wallet(privateKey, provider);
      setWallets(wallets.concat({ name: name, wallet }));
    }
  };

  const deleteWallet = i => {
    setWallets([...wallets.slice(0, i), ...wallets.slice(i + 1)]);
  };

  return (
    <div className="walletManager">
      <div className="walletManagerHeaderContainer">
        <h3 className="walletManagerHeader">Wallet Manager</h3>
        <FontAwesomeIcon
          className="createWalletBtn"
          icon={faPlus}
          size="2x"
          onClick={() => setShowWalletCreator(true)}
        />
      </div>
      <div
        className={classNames({
          wallets: true,
          justifyCenter: !wallets.length
        })}
      >
        {!wallets.length && <div>You Have No Wallets</div>}
        {wallets.map((wallet, i) => (
          <div className="wallet" key={i}>
            <span className="times" onClick={() => deleteWallet(i)}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
            <div>
              <FontAwesomeIcon icon={faWallet} size="2x" />
            </div>
            {wallet.name}
          </div>
        ))}
      </div>
      <WalletCreator
        show={showWalletCreator}
        onClose={() => setShowWalletCreator(false)}
        addWallet={addWallet}
      />
    </div>
  );
}

export default WalletManager;
