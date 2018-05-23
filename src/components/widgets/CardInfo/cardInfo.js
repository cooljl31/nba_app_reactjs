import React from 'react';
import FontAweseome from 'react-fontawesome';
import style from './cardinfo.css';
import {FormatDate} from '../../Helpers/helpers'

const CardInfo = (props) => {

  const teamName = (teams, team) =>  {
    let data = teams.find((item) => {
      return item.teamId === team
    });

    if (data) {
      return data.name
    }
  };

  return (
    <div className={style.cardInfo}>
      <span className={style.teamName} >
        {teamName(props.teams, props.team)}
      </span>
      <span className={style.date} >
        <FontAweseome name="clock-o" />
        {FormatDate(props.date)}
      </span>
    </div>
  );
};

export default CardInfo;