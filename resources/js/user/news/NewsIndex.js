import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Pagination from 'react-js-pagination';

function NewsIndex() {

  //valuesの状態を管理する
  const [newses, setNewses] = useState([{data: {}}]);

  //現在見ているページ
  const location = useLocation().search;

  
  //初回読み込み持
  useEffect(() => {
    let pageQuery =  new URLSearchParams(location);
    let pageNumber = pageQuery.get('page') ?? 1;
    getNewses(pageNumber);
  }, [])

  //ページネーションクリック持
  const runClickPagination = (pageNumber) => {
    getNewses(pageNumber);
    history.pushState({}, '', '?page=' + pageNumber);
  };

  //進む・戻る実行時
  window.onpopstate = function() {
    let pageQuery =  new URLSearchParams(location);
    let pageNumber = pageQuery.get('page') ?? 1;
    getNewses(pageNumber);
  }

  //DBからニュースの一覧情報を取得する
  const getNewses = (pageNumber) => {
    axios
      .get('/api/news?page=' + pageNumber)
      .then(response => {
        setNewses(response.data);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }


  return (
      
    <main className="main-content news">

      <h1>ニュース一覧</h1>

      {/* メインコンテンツ */}
      <div className="top__margin">
        <div className="top__news news__bg">
          {newses.data && newses.data.map((news) => (
            <a href={news.url} target="blank" className='top__news__wrap news__wrap' key={news.id}>
              <div className="top__news__title">{news.title}</div>
              <div className="top__news__author">{news.author}<br className="pc-br" />{news.published_at}</div>
            </a>
          ))}
        </div>
      </div>

      {/* 戻るボタン */}
      <Link to="/" className="standard_button btn_purple program__return">
        戻る
      </Link>

      {/* ページネーション */}
      <div className="pagination-wrap pc-only">
        <Pagination
          activePage={newses.current_page}
          itemsCountPerPage={newses.per_page}
          totalItemsCount={newses.total}
          pageRangeDisplayed='7'
          hideNavigation="false"
          onChange={runClickPagination}
          itemClass='pagination__item'
          linkClass='pagination__link'
        />
      </div>
      <div className="pagination-wrap sp-only">
        <Pagination
          activePage={newses.current_page}
          itemsCountPerPage={newses.per_page}
          totalItemsCount={newses.total}
          pageRangeDisplayed='5'
          hideNavigation="false"
          onChange={runClickPagination}
          itemClass='pagination__item'
          linkClass='pagination__link'
        />
      </div>

    </main>
  );
}

export default NewsIndex;