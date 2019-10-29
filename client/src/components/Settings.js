import React, {useContext}  from 'react';
import StoreContext from '../context/StoreContext';
import {TOGGLE_USER, SAVE_LIVE_MODE, SAVE_CURRENCY_STATE, SAVE_CRYPTO_CURRENCIES} from '../constants/actions';


function Settings() {
  const {state: {settings}, dispatch} = useContext(StoreContext);
  console.log(settings)
  return (
    <div className="settings">

      <div class="buttonSetting">
        <button onClick={() => dispatch({type: SAVE_LIVE_MODE})}>change save live mode</button>
        <button onClick={() => dispatch({type: SAVE_CURRENCY_STATE})}>change currency state</button>
        <button onClick={() => dispatch({type: SAVE_CRYPTO_CURRENCIES})}>change crypto currencies</button>
      </div>

    </div>
  );
}

export default Settings;
