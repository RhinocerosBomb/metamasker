import {
  LOG_IN,
  LOG_OUT,
  SAVE_LIVE_MODE,
  SAVE_CURRENCY_STATE,
  SAVE_CRYPTO_CURRENCIES,
  SETTINGS_INIT,
  REGISTER
} from "../constants/actions";

const UserReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOG_IN:
      newState.auth = action.data;
      newState.loggedIn = true;
      break;
    case REGISTER:
      newState.loggedIn = true;
      break;
    case LOG_OUT:
      newState.auth = null;
      newState.loggedIn = false;
      break;
    case SAVE_LIVE_MODE:
      newState.settings.cryptoTracker.saveLiveMode = !state.settings
        .cryptoTracker.saveLiveMode;
      break;
    case SAVE_CURRENCY_STATE:
      newState.settings.cryptoTracker.saveCurrencyState = !state.settings
        .cryptoTracker.saveCurrencyState;
      break;
    case SAVE_CRYPTO_CURRENCIES:
      newState.settings.cryptoTracker.saveCryptoCurrencies = !state.settings
        .cryptoTracker.saveCryptoCurrencies;
      break;
    case SETTINGS_INIT:
      newState.settings = action.data.settings;
      break;
    default:
  }
  return newState;
};

export default UserReducer;
