import React from 'react';
import style from './sideNav.css';
import {Link, withRouter} from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import firebase from 'firebase'

const SideNavItems = (props) => {

  const items = [
    {
      type: style.option,
      icon: 'home',
      name: 'Home',
      link: '/',
      login: ''
    },
    {
      type: style.option,
      icon: 'file-text-o',
      name: 'News',
      link: '/news',
      login: ''
    },
    {
      type: style.option,
      icon: 'play',
      name: 'videos',
      link: '/videos',
      login: ''
    },
    {
      type: style.option,
      icon: 'sign-in',
      name: 'Sign in',
      link: '/sign_in',
      login: true
    },
    {
      type: style.option,
      icon: 'sign-out',
      name: 'Sign out',
      link: '/sign_out',
      login: false
    },
    {
      type: style.option,
      icon: 'dashboard',
      name: 'Dasboard',
      link: '/dashboard',
      login: false
    }

  ]

  const element = (item,i) => (
    <div key={i} className={item.type}>
      <Link to={item.link} >
        <FontAwesome name={item.icon}/>
        {item.name}
      </Link>
    </div>
  )

  const restricted = (item,i) => {
    let template = null;

    if (props.user === null && item.login) {
      template = element(item,i)
    }

    if (props.user !== null && !item.login) {
      if (item.link === '/sign_out') {
        template = (
          <div key={i} className={item.type}
            onClick={()=>{
              firebase.auth().signOut().then(() => {
                props.history.push('/')
              });
            }}
          >
              <FontAwesome name={item.icon}/>
              {item.name}
          </div>
        )
      } else {

        template = element(item,i)
      }
    }




    return template;
  }
  const showItems = () =>{
    return items.map( (item,i) =>{
      return item.login !== '' ? restricted(item,i) : element(item,i)
    })
  };


  return (
    <div>
      {showItems()}
  </div>
  );
};

export default withRouter(SideNavItems);