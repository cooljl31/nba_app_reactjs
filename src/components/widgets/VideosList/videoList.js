import React, { Component } from 'react';
import style from './videosList.css';
import Axios from 'axios';
import {URL} from '../../../config'
import Button from '../../button/button'
import VideosListTemplate from './videosListTemplate'


class VideosList  extends Component {
  state = {
    teams:[],
    videos:[],
    start:this.props.start,
    end:this.props.start + this.props.amount,
    amount:this.props.amount,
    title:this.props.title,
    loadMore:this.props.loadMore,
    type:this.props.type
  }

  componentWillMount() {
    this.request(this.state.start,this.state.end)
  }

  request = (start, end) => {
    if (this.state.teams.length < 1) {
      Axios.get(`${URL}/teams`)
      .then( (response) => {
        this.setState({
          teams:response.data
        })
      })
    }
    Axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
    .then( (response) => {
      this.setState({
        videos:[...this.state.videos,...response.data],
        start,
        end
      })
    })
  }

  renderTitle = (title) => {
    return title ?
      <h3><strong>NBA</strong> Videos</h3>
    : null
  }

  renderVideos = (type) => {
    let template = null;

    switch (type) {
      case 'card':
        template = <VideosListTemplate data={this.state.videos} teams={this.state.teams}/>;
        break;
      default:
        template = null;
        break;
    }
    return template;
  }

  loadMore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end,end)
  }

  renderButton = (loadMore) => {
    return loadMore ?
    <Button type="loadmore"
    loadMore={()=> this.loadMore()}
    cta="Load More Videos" />
    :
    <Button type="linkTo" cta="More Videos" linkTo="/videos" />
  }

  render() {
    return (
      <div className={style.videosList__wrapper}>
        {this.renderTitle(this.state.title)}
        {this.renderVideos(this.state.type)}
        {this.renderButton(this.state.loadMore)}
      </div>
    );
  }
}

export default VideosList;