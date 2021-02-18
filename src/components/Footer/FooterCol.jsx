import React from 'react';

export default function FooterCol(props) {
  return (
    <div className='d-flex flex-column'>
      <ul className={'footer__column'}>{props.children}</ul>
    </div>
  );
}
