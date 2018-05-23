import React, { Component } from 'react';
import style from '../../articles.css';
import Header from './header'
import VideosRelated from '../../../widgets/VideosRelated/videosRelated'
import {firebaseDB, firebaseTeams, firebaseLooper, firebaseVideos} from '../../../../firebase'

class VideosArticle extends Component {
  state = {
    article: [],
    team: [],
    teams: [],
    related: []
  }

  componentWillMount() {
    firebaseDB
    .ref(`videos/${this.props.match.params.id}`)
    .once('value')
    .then((snap) => {
      let article = snap.val();
      firebaseTeams.orderByChild("id").equalTo(article.team).once('value')
      .then((snap) => {
        const team = firebaseLooper(snap);

        this.setState({ article, team  });
        this.getRelated();
      });
    });
  }

  getRelated = () => {
    firebaseTeams.once('value')
    .then((snap) => {
      const teams = firebaseLooper(snap);
      firebaseVideos
      .orderByChild("team")
      .equalTo(this.state.article.team)
      .limitToLast(3)
      .once('value')
      .then((snap) => {
        const related = firebaseLooper(snap);
        this.setState({ teams, related });
      });
    });
  }

  render() {
    const article = this.state.article;
    const team = this.state.team;
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