import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';

import BreadCrumb from '@/user/common_part/BreadCrumb';

function ProgramShow(props) {

  //newsの状態を管理する
  const [program, setProgram] = useState([{data: {}}]);

  //現在見ているページ
  const location = useLocation().search;

  //初回読み込み持
  useEffect(() => {
    let program_id = props.match.params.program_id
    getProgram(program_id);
  }, [])

  //DBから動画の一覧情報を取得する
  const getProgram = (program_id) => {
    axios
      .get('/api/program/' + program_id)
      .then(response => {
        setProgram(response.data);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }

  return (
    <>

      {/* パンくずリスト */}
      <BreadCrumb />

      <main className="main-content program" style={{paddingTop: 0}}>

      {/* 埋め込み動画 */}
      <div className="program__embed" dangerouslySetInnerHTML={{__html: program.embed_code}}></div>

      </main>

    </>
  );
}

export default ProgramShow;