import React, {useState} from 'react';

function Login() {
  const [fields, setFields] = useState({
    email: '',
    password: ''
  });

  const login = (e) => {
    e.preventDefault();
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
