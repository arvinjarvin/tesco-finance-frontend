import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import '../../assets/css/components/global-header.css';
import { PublicSockContext } from '../../context/PublicSockContext';
import HeaderStock from './HeaderStock';

function GlobalHeader() {
  let { recv, prices } = useContext(PublicSockContext);

  return recv !== undefined && recv.length ? (
    <div className={'global-header'}>
      <div className={'container'}>
        <ul className={'global-header__list'}>
          {recv.map((r) => (
            <HeaderStock ticker={r} />
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <div className={'global-header'}>
      <div className={'container'}>
        <ul className={'global-header__list'}>
          <li className={'global-header__list-item'}>
            <span>
              <strong>Tesco Finance</strong> loading Market Data
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default withRouter(GlobalHeader);
