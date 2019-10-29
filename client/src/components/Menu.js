import React, {useState, useEffect, useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import {Link} from "react-router-dom";

import {LoginRegisterModal, LOGIN, REGISTER} from './LoginRegisterModal';
import StoreContext from '../context/StoreContext';
import {TOGGLE_USER} from '../constants/actions';

function Menu({show, setShow}) {
  const {state: {loggedIn}, dispatch} = useContext(StoreContext);
  const [loginRegisterState, setLoginRegisterState] = useState({show: false, type: LOGIN});
  const closeLoginRegister = () => {
      setLoginRegisterState({...loginRegisterState, ...{show: false}});
  }

  const switchLoginRegister = type => {
    setLoginRegisterState({...loginRegisterState, ...{type}});
  }

  return (
    <div className="menu">
      <FontAwesomeIcon className="hamburger" icon={faBars} size="lg" onClick={setShow}/>
      <div className={classNames('sideMenu', {show})}>
        <FontAwesomeIcon className="timesRight" icon={faTimes} size="lg" onClick={setShow}/>
        <ul className="menuItems">
          <Link to="/"><li className="menuItem">Home</li></Link>
          { loggedIn &&
            <>
              <Link to="/settings"><li className="menuItem">Settings</li></Link>
              <li className="menuItem" onClick={() => dispatch({type: TOGGLE_USER})}>Logout</li>
            </>
          }
          { !loggedIn &&
            <>
              <li
              className="menuItem"
              onClick={() => setLoginRegisterState({show: true, type: LOGIN})}>
                Login
              </li>
              <li
              className="menuItem"
              onClick={() => setLoginRegisterState({show: true, type: REGISTER})}>Register</li>
            </>
          }
            <Link to="/about"><li className="menuItem">About</li></Link>
        </ul>
      </div>
      <LoginRegisterModal onClose={closeLoginRegister} switchType={switchLoginRegister} {...loginRegisterState}/>
    </div>
  );
}

export default Menu;
