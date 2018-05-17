import React, { Component } from 'react';
import Axios from 'axios';
import {URL} from '../../../config'
import style from './newslist.css';
import {Link} from 'react-router-dom'

class NewsList extends Component {

  state = {
    items: [],
    start: this.props.start,
    end: this.props.start + this.props.amount,
    amount: this.props.amount
  }

  componentWillMount() {
    this.request(this.state.start,this.state.end)
  }

  request = (start, end) => {
    Axios.get(`${URL}/articles?_start${start}&_end=${end}`)
    .then( (response) => {
      this.setState({
        items:[...this.state.items, ...response.data]
      })
    })
  }

  renderNews = (type) => {
    let template = null;
    switch (type) {
      case 'card':
        template = this.state.items.map ( (item,i) => {
          return(
            <div key={i}>
              <div className={style.newslist_item}>
                <Link to={`/articles/${item.id}`}>
                  <div className={style.featured_caption}>
                    <h2>{item.title}</h2>
                  </div>
                </Link>
              </div>
            </div>
          )
        })
        break;

      default:
        template = null;
        break;
    }
    return template;
  }

  loadmore = () => {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end,end)
  }

  render() {
    return (
      <div>
        {this.renderNews(this.props.type)}
        <div onClick={() => this.loadmore()}>
          Load more
        </div>
      </div>
    );
  }
}

export default NewsList;