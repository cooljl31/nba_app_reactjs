import React from 'react';
import FontAweseome from 'react-fontawesome';
import style from './cardinfo.css';

const CardInfo = (props) => {

  const teamName = (teams, team) =>  {
    let data = teams.find((item) => {
      return item.id === team
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
        {props.date}
      </span>
    </div>
  );
};

export default CardInfo;