import EventEmitter from 'events';
import React, { createContext, useEffect, useState } from 'react';
import { PUBLIC_SOCK } from '../services/constants';

export const PublicSockContext = createContext();

class PublicStockManager extends EventEmitter {}

export default function PublicSockContextProvider(props) {
  let [sock, setSock] = useState(null);
  let [reload, triggerReload] = useState(false);
  let [recv, setRecv] = useState([]);
  let [prices, setPrices] = useState([]);
  let [stockManager, setStockManager] = useState(new PublicStockManager());

  useEffect(() => {
    let timerId = setInterval(() => {
      triggerReload(!reload);
    }, 10000);
    let socket = new WebSocket(PUBLIC_SOCK);
    socket.onopen = () => {
      socket.onmessage = (d) => {
        let data = JSON.parse(d.data);
        if (data.ev === 'R') {
          setRecv(data.recv);
        }
        if (data.ev === 'A') {
          stockManager.emit('t', data);
        }
      };
      setSock(socket);
      clearInterval(timerId);
      socket.onclose = () => {
        setSock(null);
        timerId = setInterval(() => {
          triggerReload(!reload);
        }, 5000);
      };
    };
  }, [reload]);

  return (
    <PublicSockContext.Provider value={{ recv, stockManager }}>
      {props.children}
    </PublicSockContext.Provider>
  );
}
