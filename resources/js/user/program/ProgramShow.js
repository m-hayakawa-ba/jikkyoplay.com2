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

  //埋め込み先の要素
  //ここのページを参考に作った
  //https://qiita.com/TakashiShibusawa/items/c7499f4b92ac97e4a20a
  let target;
  let write = document.write;
  let iframe, script;

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

  //動画を埋め込む
  if (program.site_id) {

    //youtube動画の埋め込み処理
    if (program.site_id == constants['SITE_ID_YOUTUBE']) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://www.youtube.com/embed/' + program.movie_id);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      target = document.getElementById('js-program-embed');
      target.appendChild(iframe);
    }

    //ニコニコ動画の埋め込み処理
    if (program.site_id == constants['SITE_ID_NICONICO']) {
      document.write = function (arg) {
        target.innerHTML = arg;
        document.write = write;
      };
      script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', 'http://ext.nicovideo.jp/thumb_watch/' + program.movie_id + '?w=580&h=326');
      target = document.getElementById('js-program-embed');
      target.appendChild(script);
    }
  }

  return (
    <>

      {/* パンくずリスト */}
      <BreadCrumb links={[{page_name: program.title, page_url: ''}]}/>

      <main className="main-content program" style={{paddingTop: 0}}>

      {/* 埋め込み動画 */}
      <div id="js-program-embed" className="program__embed"></div>

      </main>

    </>
  );
}

export default ProgramShow;