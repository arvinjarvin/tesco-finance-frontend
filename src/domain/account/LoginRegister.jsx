import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

function LoginRegister(props) {
  let { tryLogin, authService, tryRegister, tryVerifyEmail } = useContext(
    AuthContext
  );

  let [login, setLogin] = useState(false);
  let [error, setError] = useState('');
  let [credentials, setCredentials] = useState({});

  let handleSubmit = () => {
    tryLogin(credentials.emailAddress, credentials.password);
  };

  useEffect(() => {
    authService.on('login', () => props.history.push('/'));
  }, []);

  let setFor = (e, val) => {
    let copy = credentials;
    copy[val] = e.target.value;
    setCredentials(copy);
  };

  return (
    <div className={'container-md login__container'}>
      <div className={'login__wrapper'}>
        <div className={'login-descriptor__container'}>
          <span>
            {login ? (
              <strong>Sign in to your account</strong>
            ) : (
              <strong>Sign up for an account</strong>
            )}
          </span>
          {login ? (
            <span className={'small'}>
              New to Tesco Finance?{' '}
              <strong className={'link-tag'} onClick={() => setLogin(!login)}>
                Register for an account
              </strong>
            </span>
          ) : (
            <span className={'small'}>
              Have an account?{' '}
              <strong className={'link-tag'} onClick={() => setLogin(!login)}>
                Sign in to your account
              </strong>
            </span>
          )}
        </div>
        <div className={'login__form'}>
          <div className={'form-container'}>
            <label for={'login-email'}>Email Address</label>
            <input
              type='email'
              placeholder={'Email Address'}
              id={'login-email'}
              onChange={(e) => setFor(e, 'emailAddress')}
            />
            <label for={'login-pwd'}>Password</label>
            <input
              type='password'
              id={'login-pwd'}
              onChange={(e) => setFor(e, 'password')}
            />
            {error !== null ? (
              <span className={'small red'} style={{ paddingTop: 10 }}>
                {error}
              </span>
            ) : (
              ''
            )}
            <span
              style={{
                fontSize: '1.2em',
                lineHeight: 1,

                color: 'white',
                border: '2px solid white',
                borderRadius: 100,
                padding: '9px 14px',
                marginTop: 10,
                position: 'relative',
                width: login ? 71 : 80,
                userSelect: 'none',
                cursor: 'pointer',
              }}
              className={'btn-primary'}
              onClick={handleSubmit}
            >
              <span style={{ top: -1.5, position: 'relative' }}>
                {login ? <>Sign in </> : <>Sign up </>}
                <FontAwesomeIcon
                  className={'action-i-login'}
                  icon={faChevronRight}
                />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginRegister);
