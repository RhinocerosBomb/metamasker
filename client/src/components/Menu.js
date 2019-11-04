import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";

import { LoginRegisterModal, LOGIN, REGISTER } from "./LoginRegisterModal";
import StoreContext from "../context/StoreContext";
import { LOG_OUT } from "../constants/actions";

function Menu({ firebase, show, setShow }) {
  const {
    state: { loggedIn, auth },
    dispatch
  } = useContext(StoreContext);

  const [loginRegisterState, setLoginRegisterState] = useState({
    show: false,
    type: LOGIN
  });
  const closeLoginRegister = () => {
    setLoginRegisterState({ ...loginRegisterState, ...{ show: false } });
  };

  const switchLoginRegister = type => {
    setLoginRegisterState({ ...loginRegisterState, ...{ type } });
  };

  const logOut = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/users/logout", auth.user.email)
      .then(() => {
        dispatch({ type: LOG_OUT });
      });
  };

  return (
    <div className="menu">
      <FontAwesomeIcon
        className="hamburger"
        icon={faBars}
        size="lg"
        onClick={setShow}
      />
      <div className={classNames("sideMenu", { show })}>
        <FontAwesomeIcon
          className="timesRight"
          icon={faTimes}
          size="lg"
          onClick={setShow}
        />
        <ul className="menuItems">
          <Link to="/">
            <li className="menuItem">Home</li>
          </Link>
          {loggedIn && (
            <>
              <Link to="/settings">
                <li className="menuItem">Settings</li>
              </Link>
              <li className="menuItem" onClick={logOut}>
                Logout
              </li>
            </>
          )}
          {!loggedIn && (
            <>
              <li
                className="menuItem"
                onClick={() =>
                  setLoginRegisterState({ show: true, type: LOGIN })
                }
              >
                Login
              </li>
              <li
                className="menuItem"
                onClick={() =>
                  setLoginRegisterState({ show: true, type: REGISTER })
                }
              >
                Register
              </li>
            </>
          )}
          <Link to="/about">
            <li className="menuItem">About</li>
          </Link>
        </ul>
      </div>
      <LoginRegisterModal
        firebase={firebase}
        onClose={closeLoginRegister}
        switchType={switchLoginRegister}
        {...loginRegisterState}
      />
    </div>
  );
}

export default Menu;
