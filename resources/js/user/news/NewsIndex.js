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
    console.log('初回書き込みです');
  }, [])

  //ページネーションクリック持
  const runClickPagination = (pageNumber) => {
    getNewses(pageNumber);
    history.pushState({}, '', '?page=' + pageNumber);
    console.log('ページネーションクリックです');
  };

  //進む・戻る実行時
  window.onpopstate = function() {
    let pageQuery =  new URLSearchParams(location);
    let pageNumber = pageQuery.get('page') ?? 1;
    getNewses(pageNumber);
    console.log('戻る・進む実行時です');
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
      
    <>
      newsです<br />
      <Link to="/">トップページへ戻る</Link><br /><br />

      {newses.data && newses.data.map((news) => (
        <div key={news.id}>
          {news.title}
        </div>
      ))}

      <Pagination
        activePage={newses.current_page}
        itemsCountPerPage={newses.per_page}
        totalItemsCount={newses.total}
        pageRangeDisplayed='5'
        onChange={runClickPagination}
        itemClass='page-item'
        linkClass='page-link'
      />

    </>
  );
}

export default NewsIndex;