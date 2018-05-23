import React from 'react';
import {Switch} from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewsArticle from './components/Articles/News/Post/index';
import VideosArticle from './components/Articles/videos/video/index'
import NewsMain from './components/Articles/News/Main/index'
import VideosMain from './components/Articles/videos/Mains/index'
import Dashboard from './components/Dashboard/index'
import SignIn from './components/Signin/signIn'
import PrivateRoutes from './components/AuthRoutes/privateRoutes'
import PublicRoutes from './components/AuthRoutes/publicRoutes'

const Routes = (props) => {
    return (
      <Layout user={props.user}>
        <Switch>
          <PublicRoutes {...props} restricted={false} path="/" exact component={Home} />
          <PublicRoutes {...props} restricted={false} path="/articles/:id" exac component={NewsArticle} />
          <PublicRoutes {...props} restricted={false} path="/videos/:id" exact component={VideosArticle} />
          <PublicRoutes {...props} restricted={false} path="/news" exact component={NewsMain} />
          <PublicRoutes {...props} restricted={false} path="/videos" exact component={VideosMain} />
          <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard} />
          <PublicRoutes {...props} restricted={true} path="/sign_in" exact component={SignIn}/>
        </Switch>
      </Layout>
    );
}

export default Routes;
