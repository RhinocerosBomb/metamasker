import React, {useState, useEffect} from 'react';
import LoadingBar from './LoadingBar';
import axios from 'axios';
import classNames from 'classnames';
import SearchBar from './SearchBar';
import enterKeyPress from '../utils/enterKeyPress';
import currencySymbols from '../constants/currencySymbols';
import loader from '../resources/813.svg'

function Currencies (props) {
  const [data, setData] =  useState(null);
  const [currencyState, setCurrencyState] = useState({
    currencies: ['USD', 'CAD'],
    activeCurrency: 'USD'
  });
  const [cryptoCurrencies, setCurrencies] = useState(['BTC', 'ETH']);
  const [showSearch, setShowSearch] = useState(null);
  const [timer, setTimer] = useState(null);
  const [liveMode, setLiveMode] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currencyState.currencies]);

  const fetchData = () => {
    axios
      .get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' +
        cryptoCurrencies.join(',') +
        '&tsyms=' +
        currencyState.currencies.join(',') +
        '&api_key=4e10c72fe1bb6977185562d6da3b7632824a01a52fd24047caf3a6183b3acf5e')
      .then((payload) => {
        setData(payload.data.DISPLAY);
      });
  }

  const addCurrency = (e) => {
    updateCurrencyState({currencies: currencyState.currencies.concat(e.target.value)});
  }

  const updateCurrencyState = (newProps) => {
    setCurrencyState({...currencyState, ...newProps});
  }

  const updateCurrencies = selectedOptions => {
    clearInterval(timer);
    const newCurrencyState = {...currencyState, currencies: selectedOptions};
    if(currencyState.currencies.length > selectedOptions.length) {
      currencyState.currencies.forEach((currency, i) => {
        if(currency !== selectedOptions[i] && currencyState.activeCurrency === currency) {
          if(i === 0) {
            newCurrencyState.activeCurrency = currencyState.currencies[i+1];
          } else {
            newCurrencyState.activeCurrency = currencyState.currencies[i-1];
          }
        }
      });
    }
    updateCurrencyState(newCurrencyState);
  }

  const switchTab = val => {
    if(val !== currencyState.activeCurrency && val in data[cryptoCurrencies[0]]) {
      updateCurrencyState({activeCurrency: val});
    }
  }

  const renderTable = () => {
    return (
      <div className="table">
        { data &&
          <React.Fragment>
            <div className="row">
              <h3 className="banner">Crypto Tracker</h3>
            </div>
            <div className="row tabRow">
              {currencyState.currencies.map(val =>
                <div
                  className={classNames({'tab': true, 'active': val === currencyState.activeCurrency})}
                  key={val}
                  onClick={() => switchTab(val)}>
                    {val}
                </div>
              )}
              <span className="tab" onClick={() => setShowSearch('CURR')}>+</span>
            </div>
            <div className="row labelRow">
              <div className="cell"><p>Coin</p></div>
              <div className="cell"><p>Price</p></div>
              <div className="cell"><p>Mkt. Cap.</p></div>
              <div className="cell"><p>stuff</p></div>
              <div className="cell"><p>stuff</p></div>
            </div>
            {renderRows()}
            <div className="row addCoinButton" onClick={() => setShowSearch('CRYP')}><p>Add more coins</p></div>
          </React.Fragment>
        }
        { !data &&
          <img src={loader} style={{margin: '10px'}} alt="loading"/>
        }
      </div>
    );
  }

  const renderRows = () => {
    const rowElems = [];
    for (let prop in data) {
      const rowData = data[prop][currencyState.activeCurrency];
      rowElems.push(
        <div className="row" key={prop}>
          <div className="cell"><p>{prop}</p></div>
          <div className="cell"><p>{rowData.PRICE}</p></div>
          <div className="cell"><p>{rowData.MKTCAP}</p></div>
          <div className="cell"><p>Coin</p></div>
          <div className="cell"><p>Coin</p></div>
        </div>
      );
    }

    return rowElems;
  }

  return (
    <div className="currencies">
      <span
        className={classNames({liveButton: true, active: liveMode})}
        onClick={() => setLiveMode(!liveMode)}
      >
          <span className="liveIcon"></span>
          <p>LIVE</p>
        </span>
      <SearchBar
        value={currencyState.currencies.map(val => ({value: val, label: val}))}
        options={currencySymbols.map(val => ({value: val, label:val}))}
        onChange={selectedOptions => updateCurrencies(selectedOptions.map(option => option.value))}
        onKeyPress={(e) => enterKeyPress(e, addCurrency)}
        isClearable={false}
        show={showSearch === 'CURR'}
        onClose={() => setShowSearch(null)}
        isMulti
        autoFocus
      />
      <SearchBar
        value={cryptoCurrencies.map(val => ({value: val, label: val}))}
        options={currencySymbols.map(val => ({value: val, label:val}))}
        onChange={selectedOptions => updateCurrencies(selectedOptions.map(option => option.value))}
        onKeyPress={(e) => enterKeyPress(e, addCurrency)}
        isClearable={false}
        show={showSearch === 'CRYP'}
        onClose={() => setShowSearch(null)}
        isMulti
        autoFocus
      />
      {renderTable()}
      <LoadingBar height={10} start={liveMode} execute={fetchData} interval={5000} isInterval show={liveMode}/>
    </div>
  );
}

export default Currencies;
