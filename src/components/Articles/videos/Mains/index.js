import React from 'react';
import VideosList from '../../../widgets/VideosList/videoList'

const VideosMain = () => {
  return (
    <div>
      <VideosList
        type="card"
        title={false}
        loadMore={true}
        start={0}
        amount={6}
      />
    </div>
  );
};

export default VideosMain;