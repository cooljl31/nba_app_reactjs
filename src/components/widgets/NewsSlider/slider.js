import React, { Component } from 'react';
import SliderTemplates from './slider_templates'
import {firebaseArticles, firebaseLooper, firebaseImageUrl} from '../../../firebase'

class NewsSlider extends Component {

  state = {
    news:[]
  }

  componentWillMount() {
    firebaseArticles.limitToLast(3).once('value')
    .then((snap)=>{
      const news = firebaseLooper(snap)
      console.log(news);

      const asyncFunc = (item,i,cb) => {
        firebaseImageUrl(item.image)
        .then((url) => {
          news[i].image = url
          cb()
        });
      }

      let requests = news.map((item,i) => {
        return new Promise((resolve) => {
          asyncFunc(item,i,resolve)
        })
      })

      Promise.all(requests)
      .then(() => {
        this.setState({
          news
        })
      })
    })
  }

  render() {
    return (
      <div>
        <SliderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
      </div>
    );
  }
}

export default NewsSlider;