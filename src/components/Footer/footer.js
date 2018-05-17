import React from 'react';
import style from './footer.css';
import Logo from '../Logo/logo';
import { FULL_YEAR } from "../../config";

const Footer = (props) => {
  return (
    <div className={style.footer}>
      <Logo style={style.logo}/>
      <div className={style.right}>
        NBA @{FULL_YEAR} All rights Reseverd
      </div>
    </div>
  );
};

export default Footer;