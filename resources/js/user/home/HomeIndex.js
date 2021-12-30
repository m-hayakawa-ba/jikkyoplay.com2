import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';

function HomeIndex() {

  //newsesの状態を管理する
  const [newses, setNewses] = useState([]);

  //画面に到着したらnewsデータを読み込む
  useEffect(() => {
    getNewses();
  },[])

  //一覧情報を取得しnewsesにセットする
  const getNewses = () => {
    axios
      .get('/api/main')
      .then(response => {
        setNewses(response.data);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }

  return (
    <>
      　　　　　　　　　　　　　　　　　　　　　　　　　　home<br />
      　　　　　　　　　　　　　　　　　　　　　　　　　　<Link to="/news">news一覧へ</Link>

      {newses.map((news) => (
        <div key={news.id}>
          　　　　　　　　　　　　　　　　　　　　　　　　　　{news.title}
        </div>
    ))}
    </>
  );
}

export default HomeIndex;