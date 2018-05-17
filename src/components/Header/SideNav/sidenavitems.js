import React from 'react';
import style from './sideNav.css';
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome';

const SideNavItems = () => {
  const items = [
    {
      type: style.option,
      icon: 'home',
      name: 'Home',
      link: '/'
    },
    {
      type: style.option,
      icon: 'file-text-o',
      name: 'News',
      link: '/news'
     } ,
      {
        type: style.option,
        icon: 'play',
        name: 'videos',
        link: '/videos'
      },
      {
        type: style.option,
        icon: 'sign-in',
        name: 'Sign in',
        link: '/sign_in'
      },
      {
        type: style.option,
        icon: 'sign-out',
        name: 'Sign out',
        link: '/sign_out'
      }

  ]

  const showItems = () =>{
    return items.map( (item,i) =>{
      return ( <div key={i} className={item.type}>
          <Link to={item.link} >
            <FontAwesome name={item.icon}/>
            {item.name}
          </Link>
        </div>
      )
    })
  };


  return (
    <div>
      {showItems()}
  </div>
  );
};

export default SideNavItems;