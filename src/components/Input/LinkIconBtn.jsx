import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LinkIconBtn(props) {
  let { onClick, icon, className } = props;
  return (
    <span
      className={`link-btn btn-primary icon-only br-100 ${className}`}
      style={{ marginLeft: 10 }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}
