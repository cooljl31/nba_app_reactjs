import React from 'react';
import NewsSlider from '../../../widgets/NewsSlider/slider'
import NewsList from '../../../widgets/NewsList/newsList'

const NewsMain = () => (
    <div>
      <NewsSlider
        type="featured"
        settings={{dots:false}}
        start={-1}
        amount={6}
      />
      <NewsList
      type="cardMain"
      loadMore={true}
      start={-2}
      amount={8}
      />
    </div>
  );


export default NewsMain;