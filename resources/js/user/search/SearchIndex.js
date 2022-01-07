import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';

import BreadCrumb from '@/user/common_part/BreadCrumb';
import MainTitle from '@/user/common_part/MainTitle';
import SearchBox from '@/user/common_part/SearchBox';

function SearchIndex() {

  //newsesの状態を管理する
  const [newses, setNewses] = useState([]);

  return (
    <>

      {/* パンくずリスト */}
      <BreadCrumb />

      {/* サイトロゴ */}
      <MainTitle thumbnails={thumbnails}/>

      {/* 検索ボックス */}
      <SearchBox />

      <main className="main-content top">

        result<br />
        <Link to="/news">news一覧へ</Link>

      </main>

    </>
  );
}

export default SearchIndex;