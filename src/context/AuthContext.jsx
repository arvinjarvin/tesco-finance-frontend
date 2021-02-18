import axios from 'axios';
import EventEmitter from 'events';
import React, { createContext, useEffect, useState } from 'react';
import { BASE_URL } from '../services/constants';
import FinanceService from '../services/FinanceService';

class AuthService extends EventEmitter {}

export const AuthContext = createContext();
let identityService = axios.create({
  baseURL: `http://${BASE_URL}/api/identity`,
});

export default function AuthContextProvider(props) {
  let [user, setUser] = useState(null);
  let [session, setSession] = useState(
    localStorage.getItem('access_token') || null
  );
  let [authService, setAuthService] = useState(new AuthService());

  useEffect(() => {
    if (session) {
      identityService
        .get('/me', {
          headers: {
            Authorization: `Bearer ${session}`,
          },
        })
        .then((res) => {
          authService.emit('login');
          setUser(res.data.data);
        })
        .catch((e) => {
          setSession(null);
          FinanceService.setDefaults('');
          authService.emit('logout');
        });
    } else {
      authService.emit('logout');
    }
    authService.on('logout', () => {
      FinanceService.setDefaults('');
      setUser(null);
      setSession('');
      localStorage.removeItem('access_token');
    });
    authService.on('login', () => {
      FinanceService.services.forEach((service) => {
        FinanceService[
          `${service.name.toLowerCase()}API`
        ].defaults.headers.common['Authorization'] = `Bearer ${session}`;
      });
    });
  }, []);

  let logout = () => {
    setSession('');
    FinanceService.setDefaults('');
    authService.emit('logout');
  };

  let tryLogin = (emailAddress, password) => {
    return new Promise((resolve, reject) => {
      identityService
        .post('/authenticate', {
          emailAddress,
          password,
        })
        .then((res) => {
          setSession(res.data.access_token);
          FinanceService.build().then((x) => {
            x.setDefaults(res.data.access_token);
            localStorage.setItem('access_token', res.data.access_token);

            authService.emit('login');
          });
        })
        .catch(reject);
    });
  };

  useEffect(() => {
    getSelf()
      .then((d) => setUser(d.data.data))
      .catch(logout);
  }, [session]);

  let getSelf = () => {
    return new Promise((resolve, reject) => {
      identityService
        .get('/me', { headers: { Authorization: `Bearer ${session}` } })
        .then((res) => resolve)
        .catch(reject);
    });
  };

  let tryRegister = (options) => {
    let { emailAddress, firstName, lastName, password } = options;
    return new Promise((resolve, reject) => {
      identityService
        .post('/register', {
          emailAddress,
          password,
          firstName,
          lastName,
        })
        .then((res) => {
          authService.emit('login');
          setSession(res.data.access_token);
          localStorage.setItem('access_token', res.data.access_token);
          FinanceService.setDefaults(res.data.access_token);
          resolve(res.data.access_token);
        })
        .catch(reject);
    });
  };

  let tryVerifyEmail = (code) => {
    return new Promise((resolve, reject) => {
      identityService
        .post('/verify', { code })
        .then((res) => {
          getSelf()
            .then((r) => setUser(r.data.data))
            .catch(reject);
          resolve(res);
        })
        .catch(reject);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authService,
        user,
        tryLogin,
        logout,
        getSelf,
        tryRegister,
        tryVerifyEmail,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
