/**
 * メインコンテンツ部分のメインタイトルを表示する。
 * サムネイルに使用する10枚の画像のURLを配列で渡すこと
 * 
 * @param thumbnails 表示させるサムネイルの配列
 */

import React from 'react';

import Webp from '@/user/utility/Webp';

const MainTitle = (props) => {
  return (
    <header className="maintitle">

      {/* 背景 */}
      
    
      {/* タイトルロゴ */}
      {/* <a href="/" className="maintitle__logo-sp sp-only">
        @include('vendor.webp', ['name' => 'logo', 'alt' => '実況プレイみるサイト メインロゴ'])
      </a>
      <a href="/" className="maintitle__logo-pc pc-only">
        @include('vendor.webp', ['name' => 'logo', 'alt' => '実況プレイみるサイト メインロゴ'])
      </a> */}
  
    </header>
  );
}

export default MainTitle;