import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Pagination from 'react-js-pagination';

import BreadCrumb from '@/user/common_part/BreadCrumb';
import MainTitle from '@/user/common_part/MainTitle';
import SearchBox from '@/user/common_part/SearchBox';

function NewsIndex() {

  //変数の初期値
  const initialData = {data: [
    {url: null, id:  1, title: '', author: '', published_date: ''},
    {url: null, id:  2, title: '', author: '', published_date: ''},
    {url: null, id:  3, title: '', author: '', published_date: ''},
    {url: null, id:  4, title: '', author: '', published_date: ''},
    {url: null, id:  5, title: '', author: '', published_date: ''},
    {url: null, id:  6, title: '', author: '', published_date: ''},
    {url: null, id:  7, title: '', author: '', published_date: ''},
    {url: null, id:  8, title: '', author: '', published_date: ''},
    {url: null, id:  9, title: '', author: '', published_date: ''},
    {url: null, id: 10, title: '', author: '', published_date: ''},
  ]};

  //newsの状態を管理する
  const [newses, setNewses] = useState(initialData);
  
  //現在見ているページ
  const location = useLocation().search;

  
  //初回読み込み持
  useEffect(() => {
    let page =  new URLSearchParams(location);
    let queryPage = page.get('page') ?? 1;
    getNewses(queryPage);
  }, [])

  //ページネーションクリック持
  const runClickPagination = (queryPage) => {
    getNewses(queryPage);
    history.pushState({}, '', '?page=' + queryPage);
  };

  //進む・戻る実行時
  window.onpopstate = function() {
    let page =  new URLSearchParams(location);
    let queryPage = page.get('page') ?? 1;
    getNewses(queryPage);
  }

  //DBからニュースの一覧情報を取得する
  const getNewses = (queryPage) => {
    axios
      .get('/api/news?page=' + queryPage)
      .then(response => {
        setNewses(response.data);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }


  return (
    <>

      {/* パンくずリスト */}
      <BreadCrumb links={[{page_name: 'ニュース一覧', page_url: ''}]}/>

      {/* サイトロゴ */}
      <MainTitle thumbnails={thumbnails}/>
  
      {/* 検索ボックス */}
      <SearchBox />

      <main className="main-content news">
  
        <h1>ニュース一覧</h1>
  
        {/* メインコンテンツ */}
        <div className="top__margin">
          <div className="top__news news__bg">
            {newses.data && newses.data.map((news) => (
              <a href={news.url} target="blank" className='top__news__wrap news__wrap' key={news.id}>
                <div className="top__news__title">{news.title}</div>
                <div className="top__news__author">{news.author}<br className="pc-br" />{news.published_date}</div>
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

    </>
  );
}

export default NewsIndex;