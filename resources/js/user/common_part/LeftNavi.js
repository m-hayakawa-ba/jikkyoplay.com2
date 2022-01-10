import React from 'react';
import {Link} from 'react-router-dom';

import Webp from '@/user/utility/Webp';

function LeftNavi() {
  return (
    <div id="menu" className="navi pc-only" style={{position: 'absolute', left: '0'}}>
      <div className="navi__inner">
    
        {/* サイトロゴ */}
        <a className="navi__logo" href="/">
          <Webp src="logo2"/>
        </a>
    
        {/* メインパネル */}
        <div className="navi__menu">
          <Link to="/"><span><span className="icon-home"></span></span>トップページ</Link>
          <a href="/result"><span><span className="icon-tv"></span></span>全動画一覧</a>
          <a href="/search"><span><span className="icon-search"></span></span>詳細検索</a>
          <a href="/review"><span><span className="icon-photo-video"></span></span>動画レビュー</a>
          <a href="/ranking"><span><span className="icon-trophy"></span></span>ランキング</a>
          <a href="/history"><span><span className="icon-history"></span></span>視聴履歴</a>
        </div>
    
      </div>
    </div>
  );
}

export default LeftNavi;