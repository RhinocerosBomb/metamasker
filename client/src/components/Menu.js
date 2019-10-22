import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

function Menu({show, setShow}) {
  return (
    <div className="menu">
      <FontAwesomeIcon className="hamburger" icon={faBars} size="lg" onClick={setShow}/>
      <div className={classNames('sideMenu', {show})}>
        <FontAwesomeIcon className="timesRight" icon={faTimes} size="lg" onClick={setShow}/>
        <ul className="menuItems">
          <li className="menuItem">Settings</li>
          <li className="menuItem">Login</li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
