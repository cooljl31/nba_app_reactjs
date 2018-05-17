import React from 'react';
import style from './header.css';
import FontAwesome from 'react-fontawesome';

import SideNav from './SideNav/sidenav';
import Logo from '../Logo/logo';


const Header = (props) => {

  const navBars = () => {
    return (
      <div className={style.bars}>
        <FontAwesome name="bars"
          onClick={props.onOpenNav}
          style={{
            color: '#dfdfdf',
            padding: '10px',
            cursor: 'pointer'
          }}
        />
      </div>
    )
  }
console.log(props);


  return (
    <header className={style.header}>
      <SideNav {...props}/>
      <div className={style.headerOpt}>
        {navBars()}
        <Logo style={style.logo} />
      </div>
    </header>
  );
};

export default Header;