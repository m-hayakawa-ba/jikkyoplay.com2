import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';

// 共通パート
import LeftNavi from '@/user/common_part/LeftNavi';

// メインコンテンツと下層ページ
import HomeIndex from '@/user/home/HomeIndex';

function App() {
  return (
    <>
      <LeftNavi />
      <Switch>
        <Route path="/" exact component={HomeIndex} />
      </Switch>
    </>
  );
}
  
ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app')
)