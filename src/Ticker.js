import React, {useEffect} from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

import axios from 'axios';
import './ticker.css';

function Ticker (props) {
  useEffect(() => {
    axios
      .get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR&api_key=4e10c72fe1bb6977185562d6da3b7632824a01a52fd24047caf3a6183b3acf5e')
      .then((a) => {
        console.log(a);
      });
  }, []);

  const data = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

console.log(VictoryTheme);
  return (
    <div className="ticker">
      <VictoryChart
        domainPadding={10}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          tickValues={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryBar
          data={data}
          x={"quarter"}
          y={"earnings"}
        />
      </VictoryChart>
    </div>
  );
}

export default Ticker;
