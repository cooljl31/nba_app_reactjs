import React, { Component } from 'react';
import style from '../../articles.css';
import Header from './header';
import { firebaseDB, firebaseTeams, firebaseLooper , firebaseImageUrl} from '../../../../firebase';

class NewsArticle extends Component {
  state = {
    article: [],
    team: [],
    imageUrl:''
  }


  componentWillMount() {
    firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
    .then((snap) => {
      let article = snap.val();
      firebaseTeams.orderByChild("id").equalTo(article.team).once('value')
      .then((snap) => {
        const team = firebaseLooper(snap);

        this.setState({ article, team  });

      });
      firebaseImageUrl(article.image)
      .then((imageUrl) => {
        this.setState({ imageUrl });
      })
    });

  }


  render() {
    const article = this.state.article;
    const team = this.state.team;
    return (
      <div className={style.articleWrapper}>
        <Header
        teamData={team[0]}
        date={article.date}
        author={article.author}
        />
        <div className={style.articleBody}>
        <h1>{article.title}</h1>
        <div className={style.articleImage}
            style={{
              background:`url(${this.state.imageUrl})`
            }}
        >
        </div>
        <div className={style.articleText}
          dangerouslySetInnerHTML={{
            __html: article.body
          }}
        >
        </div>
        </div>
      </div>
    );
  }
}

export default NewsArticle;