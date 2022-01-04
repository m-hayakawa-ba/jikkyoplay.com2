import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';

import MainTitle from '@/user/common_part/MainTitle';

function HomeIndex() {

  //newsesの状態を管理する
  const [thumbnails, setThumbnails] = useState([]);
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
        setThumbnails(response.data.thumbnails);
        setNewses(response.data.newses);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }

  return (
    <main className="main-content top">

      <MainTitle thumbnails={thumbnails}/>

      <div className="top__announce">
        <p>
          <span>このサイトは、ゲームの実況動画part1を集めたサイトです。</span><br />
          <span>まずは上の検索枠で、好きなゲームを検索してみてくださいね！</span>
        </p>
      </div>

      home<br />
      <Link to="/news">news一覧へ</Link>

      {newses.map((news) => (
        <div key={news.id}>
          {news.title}
        </div>
      ))}

    </main>
  );
}

export default HomeIndex;