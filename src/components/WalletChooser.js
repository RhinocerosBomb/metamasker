import React, {useState, useContext} from 'react';
import EthersContext from '../context/EthersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import Modal from './Modal';

function WalletChooser({activeWallet, show, close, onClose, selectWallet, ...props}) {
  const {wallets} = useContext(EthersContext);
  const [selectedWallet, setSelectedWallet] = useState(activeWallet);

  const toggleWallet = wallet => {
    setSelectedWallet(selectedWallet === wallet ? null : wallet);
  }

  return (
      <Modal show={show} onClose={onClose}>
        <div className="walletChooser">
            { !!wallets.length &&
              <div className="walletChooserWallets">
                {wallets.map((wallet, i) => (
                  <div className={classNames({wallet: true, walletSelect: true, active: selectedWallet === wallet})} key={i}  onClick={() => toggleWallet(wallet)}>
                    <div>
                      <FontAwesomeIcon icon={faWallet} size="4x"/>
                    </div>
                    {wallet.name}
                  </div>
                ))}
              </div>
            }
          { !wallets.length &&
            <span>You have no wallets</span>
          }
          <div>
            <button className="walletOkBtn" onClick={() => selectWallet(selectedWallet)}>Ok</button>
          </div>
        </div>
      </Modal>
  );
}

export default WalletChooser;
