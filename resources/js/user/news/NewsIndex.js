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
  const query2 = new URLSearchParams(location);
  let page = query2.get('page') ?? 1;

  //画面に到着したらnewsデータを読み込む
  useEffect(() => {
    getNewses(page);
  }, [page])

  //一覧情報を取得しvaluesにセットする
  const getNewses = (pageNumber) => {

    //apiからニュースデータを取得
    axios
      .get('/api/news?page=' + pageNumber)
      .then(response => {
        setNewses(response.data);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });

    //現在のページとリクエストしたページが違うときだけURLを書き換え
    //この処理を書かないとブラウザバックがうまくいかない
    if (page != pageNumber) {
      page = pageNumber;
      history.pushState({}, '', '?page=' + page);
      console.log('URL書き換えました');
    }
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
        onChange={getNewses}
        itemClass='page-item'
        linkClass='page-link'
      />

    </>
  );
}

export default NewsIndex;