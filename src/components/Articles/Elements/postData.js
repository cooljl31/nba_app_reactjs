import React from 'react';
import style from '../articles.css';
import {FormatDate} from '../../Helpers/helpers'


const PostData = (props) =>  (

    <div className={style.articlePostData}>
    <div>
      Data:
      <span>{ FormatDate(props.data.date) }</span>
    </div>
    <div>
      Author:
      <span>{ props.data.author }</span>
    </div>
    </div>
  )

export default PostData;