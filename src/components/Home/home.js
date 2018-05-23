import React from 'react';
import NewsSlider from '../widgets/NewsSlider/slider'
import NewsList from '../widgets/NewsList/newsList'
import VideosList from '../widgets/VideosList/videoList'

export const Home  = () => {
  return (
    <div>
      <NewsSlider
        type="featured"
        start={-1}
        amount={3}
        dots={true}
        settings={{
          dots:false
        }}
      />
      <NewsList
      type="card"
      loadmore={true}
      start={0}
      amount={3}
      />
       <VideosList
        type="card"
        title={true}
        loadMore={true}
        start={0}
        amount={3}
      />
    </div>
  );
};

export default Home;
