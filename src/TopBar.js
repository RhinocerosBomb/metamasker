import React, {useContext} from 'react';
import Logo from './Logo';
import Web3Context from './Web3Context';

import './TopBar.css';
import versionToNetworkName from './utils/versionToNetworkName'
function TopBar() {
  const {network} = useContext(Web3Context);
  const logoProps = {
    pxNotRatio: true,
    width: 30,
    height: 30,
    // pxNotRatio: false,
    // width: 0.9,
    // height: 0.9,

    // To make the face follow the mouse.
    followMouse: true,

    // head should slowly drift (overrides lookAt)
    slowDrift: false,
  };

  return (
    <div className="topBar">
      <Logo {...logoProps}/>
      <span className="network">{versionToNetworkName(network)}</span>
    </div>
  );
}

export default TopBar;
