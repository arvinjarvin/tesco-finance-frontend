import React, { useState } from 'react';
import { withRouter } from 'react-router';
import FinanceService from '../../services/FinanceService';
import Autocomplete from './Autocomplete';

export default function SearchField(props) {
  let [tickerSearch, setTickerSearch] = useState([]);
  let [value, setValue] = useState('');
  let [onSearch, setOnSearch] = useState(false);
  let [show, setShow] = useState(true);

  let { visible, setVisible } = props;

  let onSearchChange = (e) => {
    setOnSearch(true);
    setValue(e.target.value);
    if (e.target.value === '') {
      setTickerSearch([]);
    }
    FinanceService.queryAPI.get(`/tickers?q=${e.target.value}`).then((res) => {
      setTickerSearch(res.data.data.tickers);
    });
  };

  let { placeholder } = props;
  return (
    <span
      className='text-field'
      onFocus={() => {
        setOnSearch(true);
        console.log('On search');
        setVisible(true);
        onSearchChange({ target: { value: value } });
      }}
      value={value}
      onBlur={() => {
        setOnSearch(false);
        console.log('Left search');
      }}
    >
      <input
        className='text-field-input'
        placeholder={placeholder}
        onChange={onSearchChange}
      />
      {tickerSearch.length && (visible || onSearch) ? (
        <Autocomplete
          values={tickerSearch}
          onBlur={() => {
            setVisible(false);
            console.log('Invisible');
          }}
          onFocus={() => {
            setVisible(true);
            console.log('Visible');
          }}
        />
      ) : (
        ''
      )}
    </span>
  );
}
