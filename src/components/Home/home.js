import React from 'react';
import NewsSlider from '../widgets/NewsSlider/slider'
import NewsList from '../widgets/NewsList/newsList'

export const Home  = () => {
  return (
    <div>
      <NewsSlider
        type="feature"
        start={0}
        amount={6}
        dots={true}
        settings={{
          dots:false
        }}
      />
      <NewsList
      type="card"
      loadmore={true}
      start={3}
      amount={0}
      />
    </div>
  );
};

export default Home;
