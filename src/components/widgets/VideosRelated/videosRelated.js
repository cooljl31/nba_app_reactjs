import React from 'react';
import style from '../VideosList/videosList.css';
import VideosListTemplate from '../VideosList/videosListTemplate'

const VideosRelated = (props) => {
  return (
    <div className={style.relatedWrapper}>
      <VideosListTemplate
        data={props.data}
        teams={props.teams}
      />
    </div>
  );
};

export default VideosRelated;