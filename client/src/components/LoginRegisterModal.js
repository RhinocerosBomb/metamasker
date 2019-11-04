import React, {useState} from 'react';
import classNames from 'classnames';

import Modal from './Modal';
import Login from './Login';
import Register from './Register';

const LOGIN = "LOGIN";
const REGISTER = "REGISTER";

function LoginRegisterModal({firebase, type, show, onClose, switchType}) {
  return(
    <Modal show={show} onClose={onClose}>
      <div className="loginRegister">
        <div className="loginRegisterHeader">
          <div
          className={classNames('loginRegisterTab', {active: type === LOGIN})}
          onClick={() => switchType(LOGIN)}>
            <h3>Login</h3>
          </div>
          <div
          className={classNames('loginRegisterTab', {active: type === REGISTER})}
          onClick={() => switchType(REGISTER)}>
            <h3>Register</h3>
          </div>
        </div>
        { type === LOGIN &&
          <Login firebase={firebase} onSubmit={onClose}/>
        }
        { type === REGISTER &&
          <Register onSubmit={onClose}/>
        }
      </div>
    </Modal>
  );
}

export {LoginRegisterModal, LOGIN, REGISTER};
