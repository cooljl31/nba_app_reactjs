import React, { Component } from 'react';
import Axios from 'axios';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {URL} from '../../../config'
import style from './newslist.css';
import {Link} from 'react-router-dom'
import Button from '../../button/button';
import CardInfo from '../CardInfo/cardInfo'

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
      Axios.get(`${URL}/teams`)
      .then( (response) => {
        this.setState({
          teams:response.data
        })
      })
    }
    Axios.get(`${URL}/articles?_start=${start}&_end=${end}`)
    .then( (response) => {
      this.setState({
        news:[...this.state.news, ...response.data],
        start,
        end
      })
    })
  }

  loadmore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end,end)
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
              <div className={style.newslist_item}>
                <Link to={`/articles/${item.id}`}>
                  <CardInfo teams={this.state.teams} team={item.team} date={item.date}/>
                  <div className={style.featured_caption}>
                    <h2>{item.title}</h2>
                  </div>
                </Link>
              </div>
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