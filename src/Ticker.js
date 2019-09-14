import React, {useState, useEffect} from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

import axios from 'axios';
import './ticker.css';
import getDateString from './utils/getDateString';

function Ticker (props) {
  const [data, setData] =  useState(null);
  useEffect(() => {
    axios
      .get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=10&api_key=4e10c72fe1bb6977185562d6da3b7632824a01a52fd24047caf3a6183b3acf5e')
      .then((payload) => {
        setData(payload.data.Data);
      });
  }, []);

  return (
    <div className="ticker">
      { data &&
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
        >
          <VictoryAxis
          tickFormat={(x) => getDateString(new Date(x*1000))}
            domain={[data.TimeFrom, data.TimeTo]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => x}
          />
          <VictoryLine
            data={data.Data}
            x={"time"}
            y={"open"}
          />
        </VictoryChart>
      }
    </div>
  );
}

export default Ticker;
