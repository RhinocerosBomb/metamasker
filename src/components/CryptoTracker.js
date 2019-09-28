import React, {useState, useEffect} from 'react';
import LoadingBar from './LoadingBar';
import axios from 'axios';
import classNames from 'classnames';
import SearchBar from './SearchBar';
import enterKeyPress from '../utils/enterKeyPress';
import {currencySymbols, cryptoSymbols} from '../constants/currencySymbols';
import loader from '../resources/813.svg'

function CryptoTracker (props) {
  const [data, setData] =  useState(null);
  const [currencyState, setCurrencyState] = useState({
    currencies: ['USD', 'CAD'],
    activeCurrency: 'USD'
  });
  const [cryptoCurrencies, setCryptoCurrencies] = useState(['BTC', 'ETH', 'LTC', 'BAT']);
  const [showSearch, setShowSearch] = useState(null);
  const [timer, setTimer] = useState(null);
  const [liveMode, setLiveMode] = useState(false);
  var cryptoIndex = 0;
  useEffect(() => {
    fetchData();
  }, [currencyState.currencies, cryptoCurrencies]);

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

  const cryptoFilterOptions = ({label}, query) => {
    return label.toUpperCase().indexOf(query.toUpperCase()) >= 0 && cryptoIndex++ < 100;
  }

  const renderTable = () => {
    return (
      <div className="tableContainer">
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
              <div className="cell"><p>Change Today</p></div>
              <div className="cell"><p>Mkt. Cap.</p></div>
              <div className="cell"><p>Supply</p></div>
            </div>
            <div className="table">
              {renderRows()}
            </div>
            <LoadingBar height={10} start={liveMode} execute={fetchData} interval={5000} isInterval show={liveMode}/>
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
          <div className="cell"><p>{rowData.CHANGEDAY}</p></div>
          <div className="cell"><p>{rowData.MKTCAP}</p></div>
          <div className="cell"><p>{rowData.SUPPLY}</p></div>
        </div>
      );
    }

    return rowElems;
  }

  return (
    <div className="cryptoTracker">
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
        options={cryptoSymbols.map(val => ({value: val, label: val}))}
        onChange={selectedOptions => setCryptoCurrencies(selectedOptions.map(option => option.value))}
        onKeyPress={(e) => enterKeyPress(e, addCurrency)}
        filterOption={cryptoFilterOptions}
        onInputChange={() => { cryptoIndex = 0 }}
        isClearable={false}
        show={showSearch === 'CRYP'}
        onClose={() => setShowSearch(null)}
        isMulti
        autoFocus
      />
      {renderTable()}
    </div>
  );
}

export default CryptoTracker;
