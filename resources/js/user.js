import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

// 共通js
import ScrollToTop  from '@/user/utility/ScrollToTop'; 

// 共通パート
import LeftNavi from '@/user/common_part/LeftNavi';

// メインコンテンツと下層ページ
import HomeIndex from '@/user/home/HomeIndex';
import NewsIndex from '@/user/news/NewsIndex';
import SearchIndex from '@/user/search/SearchIndex';

function App() {
  return (
    <>

      {/* 左カラム */}
      <LeftNavi />

      {/* メインコンテンツ部分 */}
      <div id="main" className="main">
        <Switch>
          <Route path="/" exact component={HomeIndex} />
          <Route path="/news" exact component={NewsIndex} />
          <Route path="/search" exact component={SearchIndex} />
        </Switch>
      </div>
      
    </>
  );
}
  
ReactDOM.render((
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  ), document.getElementById('app')
)