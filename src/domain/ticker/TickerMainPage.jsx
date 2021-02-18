import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import FinanceService from '../../services/FinanceService';
import Chart from 'kaktana-react-lightweight-charts';

function TickerMainPage(props) {
  let { match } = props;

  let [companyData, setCompanyData] = useState({});
  let [trades, setTrades] = useState([]);
  let [ready, setReady] = useState(false);

  let opts = {
    options: {
      alignLabels: true,
      timeScale: {
        rightOffset: 12,
        barSpacing: 3,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        borderColor: '#fff000',
        visible: true,
        timeVisible: true,
        secondsVisible: false,
      },
    },
  };

  useEffect(() => {
    FinanceService.build().then((financeService) => {
      // troublesome so i made it a promise
      financeService.marketAPI
        .get(`/symbols/${match.params.ticker}/trades`)
        .then((res) => {
          let formatted = res.data.data.map((x) => {
            return {
              open: x.o,
              close: x.c,
              high: x.h,
              low: x.l,
              time: parseInt((new Date(x.t).getTime() / 1000).toFixed(0)),
            };
          });
          setTrades(formatted);
          setReady(true);
        })
        .catch((ex) => setReady(false));
      financeService.marketAPI
        .get(`/symbols/${match.params.ticker}/company`)
        .then((res) => {
          setCompanyData(res.data.data);
        });
    });
  }, [match.params.ticker]);

  return (
    <div
      className={'container-md'}
      style={{
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <div className={'flex flex-column'}>
        <span className={'heading-primary'}>
          {companyData.name} <strong>({companyData.symbol})</strong>
        </span>
        <span
          className={'small'}
          style={{
            color: '#707070',
          }}
        >
          {companyData.description}
        </span>
        <span>
          {companyData.exchange} ({companyData.exchangeSymbol}) realtime data.
          All currencies in USD.
        </span>
      </div>
      {ready ? (
        <Chart
          options={opts.options}
          candlestickSeries={[{ data: trades }]}
          height={500}
          autoWidth
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default TickerMainPage;
