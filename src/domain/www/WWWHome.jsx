import React, { useEffect } from 'react';
import { jarallax, jarallaxVideo } from 'jarallax';
import blue from '../../assets/static/blue.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function WWWHome() {
  useEffect(() => {
    jarallaxVideo();

    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2,
      videoSrc: 'https://www.youtube.com/watch?v=7LN6fQVRpK4',
      imgSrc: blue,
    });
  }, []);

  return (
    <div>
      <div style={{ height: 'calc(86.3vh)' }} className='jarallax'>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background:
              'linear-gradient(40deg,rgba(3, 149, 233, 0.7),rgba(48,63,159,.2))',
            zIndex: 1,
          }}
          className='homepage-hero__jarallax'
        >
          <div className='container y-auto' style={{ flex: 1, marginTop: 15 }}>
            <div
              style={{
                background: 'var(--tesco-white-secondary)',
                padding: '8px 10px',
                borderRadius: 10,
              }}
            >
              <span
                style={{
                  fontSize: '1em',
                  width: '75%',
                  color: 'var(--tesco-red)',
                }}
              >
                Only US markets are supported at this stage. Please be aware
                that errors will occur at this stage of development.
              </span>
            </div>
          </div>
          <div className='container y-auto' style={{ marginBottom: '33vh' }}>
            <div>
              <span
                style={{
                  fontSize: '2.4em',
                  width: '75%',
                  color: 'white',
                }}
              >
                Shape your trading portfolio with{' '}
                <strong>
                  Tesco
                  <span style={{ color: 'var(--tesco-red)' }}>.</span>
                </strong>
              </span>
            </div>
            <div className={'homepage-hero__secondary'}>
              <span
                style={{
                  fontSize: '1.4em',
                  lineHeight: 1,

                  color: 'white',
                  border: '2px solid white',
                  borderRadius: 100,
                  padding: '9px 14px',
                  position: 'relative',

                  userSelect: 'none',
                  cursor: 'pointer',
                }}
                className={'secondary-btn'}
              >
                <span style={{ top: -1.5, position: 'relative' }}>
                  Sign up{' '}
                  <FontAwesomeIcon
                    className={'action-i'}
                    icon={faChevronRight}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
