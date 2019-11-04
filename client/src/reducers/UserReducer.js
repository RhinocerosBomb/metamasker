import {LOG_IN, SAVE_LIVE_MODE, SAVE_CURRENCY_STATE, SAVE_CRYPTO_CURRENCIES} from '../constants/actions';

const UserReducer = (state, action) => {
  let newState = {...state};
  switch (action.type) {
    case LOG_IN:
      newState.loggedIn = !state.loggedIn;
      break;
    case SAVE_LIVE_MODE:
      newState.settings.cryptoTracker.saveLiveMode = !state.settings.cryptoTracker.saveLiveMode;
      break;
    case  SAVE_CURRENCY_STATE:
      newState.settings.cryptoTracker.saveCurrencyState = !state.settings.cryptoTracker.saveCurrencyState;
      break;
    case  SAVE_CRYPTO_CURRENCIES:
      newState.settings.cryptoTracker.saveCryptoCurrencies = !state.settings.cryptoTracker.saveCryptoCurrencies;
      break;
    case  SETTINGS_INIT:
      console.log(action.data.settings);
      newState.settings = action.data.settings;
      break;
    default:
  }
  return newState;
}

export default UserReducer;
