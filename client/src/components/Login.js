import React, {useState, useContext} from 'react';
import StoreContext from '../context/StoreContext';
import {TOGGLE_USER} from '../constants/actions';

function Login({onSubmit}) {
  const {state: {loggedIn}, dispatch} = useContext(StoreContext);

  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  const login = (e) => {
    e.preventDefault();
    dispatch({type: TOGGLE_USER});
    onSubmit()
  }

  return(
    <div className="login">
      <form onSubmit={e => login(e)} className="loginFields">
        <div className="inputBox dark">
          Email
          <input
            className="hasColorBlack"
            type="text"
            value={fields.email}
            onChange={e => setFields({...fields, ...{email: e.target.value}})}
          />
          <hr/>
        </div>
        <div className="inputBox dark">
          Password
          <input
            className="hasColorBlack"
            type="password"
            value={fields.password}
            onChange={e => setFields({...fields, ...{password: e.target.value}})}
          />
          <hr/>
        </div>
        <button className="loginButton dark" type="submit">LOG IN</button>
      </form>
    </div>
  );
}

export default Login;
