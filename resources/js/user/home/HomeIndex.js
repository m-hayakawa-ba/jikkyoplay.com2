import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';

import BreadCrumb from '@/user/common_part/BreadCrumb';
import MainTitle from '@/user/common_part/MainTitle';
import SearchBox from '@/user/common_part/SearchBox';
import ProgramList from '@/user/common_part/ProgramList';

function HomeIndex() {

  //変数の初期値
  const initialData = {newses: [
    {url: null, id: 1, title: '', author: '', published_date: ''},
    {url: null, id: 2, title: '', author: '', published_date: ''},
    {url: null, id: 3, title: '', author: '', published_date: ''},
    {url: null, id: 4, title: '', author: '', published_date: ''},
  ]};

  //DBから取得したデータを管理する
  const [data, setData] = useState(initialData);

  //画面に到着したらnewsデータを読み込む
  useEffect(() => {
    getDatas();
  },[])

  //トップページに必要な情報を取得し、変数にセットする
  const getDatas = () => {
    axios
      .get('/api/main')
      .then(response => {
        setData(response.data);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }

  return (
    <>

      {/* パンくずリスト */}
      <BreadCrumb links={[]}/>

      {/* サイトロゴ */}
      <MainTitle thumbnails={thumbnails}/>

      {/* 検索ボックス */}
      <SearchBox />

      <main className="main-content top">

        <div className="top__announce">
          <p>
            <span>このサイトは、ゲームの実況動画part1を集めたサイトです。</span><br />
            <span>まずは上の検索枠で、好きなゲームを検索してみてくださいね！</span>
          </p>
        </div>

        {/* ゲーム実況ニュース */}
        <div className="top__margin">
          <div className="top__subtitle">
            <h2>
              <Link to="/news">
                <span className="icon-rss"></span> ゲーム実況ニュース
              </Link>
            </h2>
            <span>毎日更新！</span>
          </div>
          <div className="top__news">
            {data.newses && data.newses.map((news) => (
              <a href={news.url} target="blank" className='top__news__wrap' key={news.id}>
                <div className="top__news__title">{news.title}</div>
                <div className="top__news__author">{news.author} {news.published_date}</div>
              </a>
            ))}
          </div>
          <div style={{textAlign: 'right'}}>
            <Link to="/news" className="top__next-arrow" style={{margin: '0 0 0 auto'}}>
              <span className="icon-chevron-circle-right"></span> 過去のニュースを見る！
            </Link>
          </div>
        </div>

        {/* 新着動画 */}
        <div className="top__margin">
          <div className="top__subtitle">
            <h2><a href="/result">
              <span className="icon-tv"></span> 新着動画
            </a></h2>
            <span>毎日更新ピックアップ動画！</span>
          </div>

          <div className="top__movielist">
            {data.programs && data.programs.map((program, index) => (
              <div className={ index >= 4 ? 'pc-only' : '' } key={ program.id }>
                <ProgramList
                  program={ program }
                  backgournd_color_pc={ (index + Math.floor(index/4))%2 ? 'white' : 'black' }
                  backgournd_color_sp={ index%2 ? 'white' : 'black' }
                />
              </div>
            ))}
            
          </div>
          <div style={{textAlign: 'right'}}>
            <Link to="/result" className="top__next-arrow">
              <span className="icon-chevron-circle-right"></span> 新着順で全動画をチェック！
            </Link>
          </div>
        </div>

      </main>

    </>
  );
}

export default HomeIndex;