import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { PublicSockContext } from '../../context/PublicSockContext';
import FinanceService from '../../services/FinanceService';

function HeaderStock(props) {
  let { ticker } = props;
  let { stockManager } = useContext(PublicSockContext);
  let [price, setPrice] = useState(0);
  let [data, setData] = useState({});

  useEffect(() => {
    FinanceService.publicAPI.get(`/ticker?ticker=${ticker}`).then((res) => {
      setPrice(res.data.data.lastTrade.price);
      setData(res.data.data);
    });
    stockManager.on('t', (d) => {
      if (d.sym === ticker) {
        setPrice([d.a, price]);
      }
    });
    setInterval(() => {
      FinanceService.publicAPI.get(`/ticker?ticker=${ticker}`).then((res) => {
        setPrice(res.data.data.lastTrade.price);
        setData(res.data.data);
      });
    }, 20000);
  }, []);

  return (
    <li className={'global-header__list-item'}>
      <div
        className={'global-header__stock-item'}
        onClick={() => props.history.push(`/tickers/${ticker}`)}
      >
        <span>
          {ticker} <strong>${parseFloat(price).toFixed(2)}</strong>
        </span>
        {data.closed === undefined && !data.closed ? (
          <span
            className={`${
              data.todaysChangePerc > 0 ? 'stock-green' : 'stock-red'
            }`}
          >
            {data.todaysChangePerc > 0 ? '+' : ''}
            {parseFloat(data.todaysChangePerc).toFixed(2)}% (
            {parseFloat(data.todaysChange).toFixed(2)})
          </span>
        ) : (
          <span className={'stock-red'}>Market Closed</span>
        )}
      </div>
    </li>
  );
}

export default withRouter(HeaderStock);
