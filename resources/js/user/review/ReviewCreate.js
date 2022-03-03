import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import BreadCrumb from '@/user/common_part/BreadCrumb';
import MainTitle from '@/user/common_part/MainTitle';
import SearchBox from '@/user/common_part/SearchBox';

const ReviewCreate = (props) => {

  //programの状態を管理する
  const [program, setProgram] = useState([]);

  //レビューのフォーム用
  const [name, setName] = useState('');  
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const [review, setReview] = useState('');  
  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };
  const handleSubmit = () => {
    console.log(name);
    console.log(review);
  }

  //画面に到着したらnewsデータを読み込む
  useEffect(() => {
    getProgram();
  },[])

  //表示に必要な情報を取得し、変数にセットする
  const getProgram = () => {
    axios
      .get('/api/review/create/' + props.match.params.program_id)
      .then(response => {
        setProgram(response.data.program);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }

  //出力
  return (
    <>

      {/* パンくずリスト */}
      <BreadCrumb links={[{page_name: program.title, page_url: '/program/' + program.id}, {page_name: 'レビューを書く', page_url: ''}]}/>
  
      {/* サイトロゴ */}
      <MainTitle thumbnails={thumbnails}/>
  
      {/* 検索ボックス */}
      <SearchBox />
  
      <main className="main-content review">

        <form method="post" action="/review">

          {/* 投稿者名 */}
          <div className="review__formwrap">
            <label>レビューを書く人の名前</label>
            <input type="text" className="review__input" value={name} onChange={handleNameChange} />
          </div>
      
          {/* レビュー本文 */}
          <div className="review__formwrap">
            <label>レビュー本文</label>
            <textarea id="detail" className="review__textarea" name="detail" rows="4" value={review} onChange={handleReviewChange} />
            <div className="review__formwrap__length">
              文字数 <span id="review-length">0</span> ( 150文字以上 250文字以下 )
            </div>
          </div>
      
          {/* 投稿ボタン */}
          <button type="submit" className="standard_button btn_green review__submit-button" onClick={handleSubmit}>投稿する</button>

        </form>
      </main>

    </>
  );
}

export default ReviewCreate;