import React from 'react';
import { withRouter } from 'react-router';
import '../../assets/css/components/autocomplete.css';

function Autocomplete(props) {
  let { values, onBlur, onFocus } = props;
  return (
    <div
      className={'search__autocomplete'}
      onMouseLeave={onBlur}
      onMouseEnter={onFocus}
    >
      {values.map((v) => (
        <div
          className={'search__autocomplete-item'}
          onClick={() => {
            props.history.push(`/tickers/${v.ticker}`);
          }}
        >
          <span>
            <strong>{v.ticker}</strong> {v.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default withRouter(Autocomplete);
