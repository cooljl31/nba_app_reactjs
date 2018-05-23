import React, { Component } from 'react';
import style from './videosList.css';
import Button from '../../button/button'
import VideosListTemplate from './videosListTemplate'
import {firebaseLooper, firebaseTeams, firebaseVideos} from '../../../firebase'


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
      if (this.state.teams.length < 1) {
        firebaseTeams.once('value')
        .then((snap) => {
          const teams = firebaseLooper(snap);

          this.setState({ teams });
        });
      }


    }
    firebaseVideos.orderByChild("id").startAt(start).endAt(end).once('value')
    .then((snap) => {
      const videos = firebaseLooper(snap);
      this.setState({
        videos:[...this.state.videos, ...videos],
        start,
        end
      })
    });
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
    this.request(this.state.end + 1,end)
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