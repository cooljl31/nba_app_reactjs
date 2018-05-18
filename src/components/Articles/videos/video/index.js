import React, { Component } from 'react';
import style from '../../articles.css';
import Axios from 'axios';
import Header from './header'
import {URL} from '../../../../config'
import VideosRelated from '../../../widgets/VideosRelated/videosRelated'

class VideosArticle extends Component {
  state = {
    article: [],
    team: [],
    teams: [],
    related: []
  }

  componentWillMount() {
    Axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
    .then( response => {
      let article = response.data[0];

      Axios.get(`${URL}/teams?id=${article.team}`)
      .then( response => {
        this.setState({
          article,
          team: response.data
        })
        this.getReleted();
      })
    })
  }

  getReleted = () => {
    Axios.get(`${URL}/teams`)
    .then( response => {
      let teams = response.data;

    Axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
      .then ( response => {

        this.setState({
          teams,
          related: response.data
        })
      })
    })
  }

  render() {
    const article = this.state.article;
    const team = this.state.team;
    console.log(article);
    return (
      <div className={style.viedosArticle__wrapper}>
        <Header
        teamData={team[0]}
        date={article.date}
        author={article.author}
        />
        <div className={style.viedosArticle__wrapper}>
          <h1>{article.title}</h1>
          <iframe
            title="videoplayer"
            width="100%"
            height="300px"
            src={`https://www.youtube.com/embed/${article.url}`}
          >
          </iframe>
        </div>
        <VideosRelated
          data={this.state.related}
          teams={this.state.teams}
        />
      </div>
    );
  }
}

export default VideosArticle;