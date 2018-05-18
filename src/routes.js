import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewsArticle from './components/Articles/News/Post/index';
import VideosArticle from './components/Articles/videos/video/index'
import NewsMain from './components/Articles/News/Main/index'
import VideosMain from './components/Articles/videos/Mains/index'

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles/:id" exac component={NewsArticle} />
          <Route path="/videos/:id" exact component={VideosArticle} />
          <Route path="/news" exact component={NewsMain} />
          <Route path="/videos" exact component={VideosMain} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
