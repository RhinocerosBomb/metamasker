import React, { useState, useContext } from 'react';
import Logo from './Logo';
import EthersContext from '../context/EthersContext';
import Menu from './Menu';

import versionToNetworkName from '../utils/versionToNetworkName';
function TopBar() {
  const { network } = useContext(EthersContext);
  const [showMenu, setShowMenu] = useState(false);
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
    slowDrift: false
  };

  return (
    <div className="topBar">
      <Logo {...logoProps} />
      <span className="network">{versionToNetworkName(network)}</span>
      <Menu show={showMenu} setShow={() => setShowMenu(!showMenu)}/>
    </div>
  );
}

export default TopBar;
