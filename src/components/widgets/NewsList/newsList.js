import React, { Component } from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import style from './newslist.css';
import {Link} from 'react-router-dom'
import Button from '../../button/button';
import CardInfo from '../CardInfo/cardInfo'
import {firebaseTeams, firebaseLooper, firebaseArticles} from '../../../firebase'

class NewsList extends Component {

  state = {
    teams:[],
    news: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  }

  componentWillMount() {
    this.request(this.state.start,this.state.end)
  }

  request = (start, end) => {
    if (this.state.teams.length < 1) {
      firebaseTeams.once('value')
      .then((snap) => {
        const teams = firebaseLooper(snap);

        this.setState({ teams });
      });
    }

    firebaseArticles.orderByChild("team").startAt(start).endAt(end).once('value')
    .then((snap) => {
      const articles = firebaseLooper(snap);

      this.setState({
        news:[...this.state.news, ...articles],
        start,
        end
      })
    });

  }

  loadmore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end + 1,end)
  }

  renderNews = (type) => {
    let template = null;
    switch (type) {
      case 'card':
        template = this.state.news.map ( (item,i) => (
          <CSSTransition
            classNames={{
              enter: style.newsList_wrapper,
              enterActive: style.newsList_wrapper_enter
            }}
            timeout={500}
            key={i}
          >
            <div key={i}>
              <Link to={`/articles/${item.id}`}>
                <div className={style.newslist_item}>
                  <CardInfo teams={this.state.teams} team={item.team} date={item.date}/>
                  <div className={style.featured_caption}>
                    <h2>{item.title}</h2>
                  </div>
                </div>
              </Link>
            </div>
          </CSSTransition>
          ))
        break;

      case 'cardMain':
        template = this.state.news.map ( (item,i) => (
          <CSSTransition
            classNames={{
              enter: style.newsList_wrapper,
              enterActive: style.newsList_wrapper_enter
            }}
            timeout={500}
            key={i}
          >
            <div key={i}>
              <Link to={`/articles/${item.id}`}>
                <div className={style.flex__wrapper}>
                    <div className={style.left}
                      style={{
                        background: `url(/images/articles/${item.image})`
                      }}>
                      <div></div>
                    </div>
                    <div className={style.right}>
                      <CardInfo teams={this.state.teams} team={item.team} date={item.date}/>
                      <div className={style.featured_caption}>
                        <h2>{item.title}</h2>
                      </div>
                    </div>
                </div>
              </Link>
            </div>
          </CSSTransition>
          ))
        break;
      default:
        template = null;
        break;
    }
    return template;
  }


  render() {
    return (
      <div>
        <TransitionGroup
          component="div"
          className="list"
        >
          {this.renderNews(this.props.type)}
        </TransitionGroup>
        <Button
          type="loadmore"
          loadMore={() => this.loadmore()}
          cta="Load more News"
        />
      </div>
    );
  }
}

export default NewsList;