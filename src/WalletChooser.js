import React, {useState, useEffect, useContext} from 'react';
import EthersContext from './EthersContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import Modal from './Modal';

function WalletChooser({activeWallet, show, close, onClose, selectWallet, ...props}) {
  const {wallets} = useContext(EthersContext);
  const [selectedWallet, setSelectedWallet] = useState(activeWallet);
  return (
      <Modal show={show} onClose={onClose}>
        <div>
          { !!wallets.length &&
            wallets.map((wallet, i) => (
              <div className={classNames({wallet: true})} key={i}  onClick={() => setSelectedWallet(wallet)}>
                <FontAwesomeIcon icon={faWallet} size="lg"/>
                {wallet.name}
              </div>
            ))
          }
          { !wallets.length &&
            <span>You have no wallets</span>
          }
          <div>
            <button onClick={() => selectWallet(selectedWallet)}>Ok</button>
          </div>
        </div>
      </Modal>
  );
}

export default WalletChooser;
