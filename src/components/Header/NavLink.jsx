import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLink(props) {
  let { to, children } = props;
  return (
    <Link to={to} className={'navbar-link'}>
      <span>{children}</span>
    </Link>
  );
}
