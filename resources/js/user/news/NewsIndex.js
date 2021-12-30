import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';

function NewsIndex() {

  //valuesの状態を管理する
  const [newses, setNewses] = useState([{data: {}}]);

  //画面に到着したらnewsデータを読み込む
  useEffect(() => {
    getNewses();
  },[])

  //一覧情報を取得しvaluesにセットする
  const getNewses = () => {
    axios
      .get('/api/news')
      .then(response => {
        setNewses(response.data);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }

  return (
    <>
      　　　　　　　　　　　　　　　　　　　　　　　　　　newsです<br />
      　　　　　　　　　　　　　　　　　　　　　　　　　　<Link to="/">トップページへ戻る</Link><br /><br />

      
      {newses.data && newses.data.map((news) => (
        <div key={news.id}>
          　　　　　　　　　　　　　　　　　　　　　　　　　　{news.title}
        </div>
      ))}
    </>
  );
}

export default NewsIndex;