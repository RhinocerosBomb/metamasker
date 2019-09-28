import React, {useState} from 'react';

import Modal from './Modal';

const defaultWalletFields = {name: '', privateKey: ''}

function WalletChooser({addWallet, show, onClose }) {
  const [walletFields, setWalletFields] = useState(defaultWalletFields);

  const createWallet = () => {
    addWallet(walletFields);
    setWalletFields(defaultWalletFields);
  }

  return (
      <Modal show={show} onClose={onClose}>
        <div className="walletCreator">
          <h3>Wallet Creator</h3>
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
              <button onClick={createWallet}>Add</button>
            </div>
          </div>
        </div>
      </Modal>
  );
}

export default WalletChooser;
