import React from 'react';
import {Link} from 'react-router-dom'

const Logo = (props) => (
  <Link to="/" className={props.style}>
    <img src="/images/nba_logo.png" alt="nba logo"/>
  </Link>
)
export default Logo;