import React, { useContext, useEffect, useState } from 'react';
import '../../assets/css/components/navbar.css';
import logo from '../../assets/static/logo.svg';
import SearchField from '../Input/SearchField';
import LinkIconBtn from '../Input/LinkIconBtn';
import { faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, withRouter } from 'react-router-dom';
import FinanceService from '../../services/FinanceService';
import Autocomplete from '../Input/Autocomplete';
import NavLink from './NavLink';
import { AuthContext } from '../../context/AuthContext';

function MainNavbar(props) {
  let [visible, setVisible] = useState(false);

  let { user } = useContext(AuthContext);

  return (
    <div className={'navbar-wrapper'}>
      <div className={'navbar-main'}>
        <div className={'navbar-container'}>
          <div className={'navbar-heading'}>
            <Link to='/' className='logo'>
              <img src={logo} alt='Tesco' />
              <span className={'navbar-heading__signpost'}>Finance</span>
            </Link>
            <div className={'navbar-heading__widgets'}>
              <div className={'navbar__links'}>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/news'>News</NavLink>
                <NavLink to='/contacts'>Contacts</NavLink>
              </div>

              <div className={'search-wrapper'}>
                <SearchField
                  placeholder={'Search for Symbols or Companies'}
                  visible={visible}
                  setVisible={setVisible}
                />
                <LinkIconBtn icon={faSearch} />
                <LinkIconBtn
                  icon={faUser}
                  onClick={
                    user
                      ? props.history.push('/account')
                      : () => props.history.push('/auth')
                  }
                />
                <LinkIconBtn
                  icon={faBars}
                  className={'navbar-menu-button__mobile'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MainNavbar);
