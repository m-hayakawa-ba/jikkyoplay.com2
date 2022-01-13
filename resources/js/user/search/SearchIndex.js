import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import Pagination from 'react-js-pagination';

import BreadCrumb from '@/user/common_part/BreadCrumb';
import MainTitle from '@/user/common_part/MainTitle';
import SearchBox from '@/user/common_part/SearchBox';

function SearchIndex() {

  //newsの状態を管理する
  const [programs, setPrograms] = useState([{data: {}}]);

  //現在見ているページ
  const location = useLocation().search;

  
  //初回読み込み持
  useEffect(() => {
    let page =  new URLSearchParams(location);
    let queryPage = page.get('page') ?? 1;
    let queryWord = page.get('word') ?? '';
    getPrograms(queryPage, queryWord);
  }, [])

  //DBから動画の一覧情報を取得する
  const getPrograms = (queryPage, queryWord) => {
    axios
      .get('/api/search?word=' + queryWord + '&page=' + queryPage)
      .then(response => {
        setPrograms(response.data);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }

  return (
    <>

      {/* パンくずリスト */}
      <BreadCrumb links={[{page_name: '検索結果', page_url: ''}]} />

      {/* サイトロゴ */}
      <MainTitle thumbnails={thumbnails}/>

      {/* 検索ボックス */}
      <SearchBox />

      <main className="main-content top">

        {programs.data && programs.data.map((program) => (
          <div key={program.id}>
            <p>{program.id} - {program.title}</p>
          </div>
        ))}

      </main>

    </>
  );
}

export default SearchIndex;