//rename later
import React, {useState, useEffect, useContext} from 'react';
import {ethers} from 'ethers';
import Web3Context from './Web3Context';

function MetaMask() {
  const providerState = useContext(Web3Context);
  const [balance, setBalance] = useState();
  useEffect(() => {
    if (providerState) {
      providerState.provider.getBalance(providerState.account).then(newBalance => {
        setBalance(ethers.utils.formatEther(newBalance));
      });
    }
  }, []);
  
  return(
    <div className="MetaMask">
      {balance}
    </div>
  );
}

export default MetaMask;
