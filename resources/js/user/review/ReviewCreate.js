import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import BreadCrumb from '@/user/common_part/BreadCrumb';
import MainTitle from '@/user/common_part/MainTitle';
import SearchBox from '@/user/common_part/SearchBox';

const ReviewCreate = (props) => {

  //programの状態を管理する
  const [program, setProgram] = useState([]);

  //画面に到着したらnewsデータを読み込む
  useEffect(() => {
    getProgram();
  },[])

  //表示に必要な情報を取得し、変数にセットする
  const getProgram = () => {
    axios
      .get('/api/review/create/' + props.match.params.program_id)
      .then(response => {
        setProgram(response.data.program);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }

  console.log(program);

  //出力
  return (
    <>

      {/* パンくずリスト */}
      <BreadCrumb links={[{page_name: program.title, page_url: '/program/' + program.id}, {page_name: 'レビューを書く', page_url: ''}]}/>
  
      {/* サイトロゴ */}
      <MainTitle thumbnails={thumbnails}/>
  
      {/* 検索ボックス */}
      <SearchBox />
  
      <main className="main-content review">
          
      </main>

    </>
  );
}

export default ReviewCreate;