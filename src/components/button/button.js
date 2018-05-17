import React from 'react';
import {Link} from 'react-router-dom'
import style from './button.css';
const Button = (props) => {
  let template = null;

  switch (props.type) {
    case 'loadmore':
      template = (
      <div className={style.blue_btn}
        onClick={props.loadMore}
      >
      {props.cta}
        <Link to="/"/>
      </div>
      );
      break;
    case 'linkTo':
      template = (
        <Link to={props.linkTo}
        className={style.blue_btn}>
        {props.cta}
        </Link>
      )
      break;
    default:
      template = null;
      break;
  }
  return template;

};

export default Button;