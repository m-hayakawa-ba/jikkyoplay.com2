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
      <div className="maintitle__bg-top" style={{
        backgroundImage:
         "url(" + (props.thumbnails[0] && props.thumbnails[0].image_url) + "), " +
         "url(" + (props.thumbnails[1] && props.thumbnails[1].image_url) + "), " +
         "url(" + (props.thumbnails[2] && props.thumbnails[2].image_url) + "), " +
         "url(" + (props.thumbnails[3] && props.thumbnails[3].image_url) + "), " +
         "url(" + (props.thumbnails[4] && props.thumbnails[4].image_url) + "), " +
         "url(" + (props.thumbnails[0] && props.thumbnails[0].image_url) + "), " +
         "url(" + (props.thumbnails[1] && props.thumbnails[1].image_url) + "), " +
         "url(" + (props.thumbnails[2] && props.thumbnails[2].image_url) + "), " +
         "url(" + (props.thumbnails[3] && props.thumbnails[3].image_url) + "), " +
         "url(" + (props.thumbnails[4] && props.thumbnails[4].image_url) + ")"
      }}>
      </div>
      <div className="maintitle__bg-bottom" style={{
        backgroundImage:
        "url(" + (props.thumbnails[5] && props.thumbnails[5].image_url) + "), " +
        "url(" + (props.thumbnails[6] && props.thumbnails[6].image_url) + "), " +
        "url(" + (props.thumbnails[7] && props.thumbnails[7].image_url) + "), " +
        "url(" + (props.thumbnails[8] && props.thumbnails[8].image_url) + "), " +
        "url(" + (props.thumbnails[9] && props.thumbnails[9].image_url) + "), " +
        "url(" + (props.thumbnails[5] && props.thumbnails[5].image_url) + "), " +
        "url(" + (props.thumbnails[6] && props.thumbnails[6].image_url) + "), " +
        "url(" + (props.thumbnails[7] && props.thumbnails[7].image_url) + "), " +
        "url(" + (props.thumbnails[8] && props.thumbnails[8].image_url) + "), " +
        "url(" + (props.thumbnails[9] && props.thumbnails[9].image_url) + ")"
      }}>
      </div>
    
      {/* タイトルロゴ */}
      <a href="/" className="maintitle__logo-sp sp-only">
        <Webp src="logo" alt="実況プレイみるサイト メインロゴ"/>
      </a>
      <a href="/" className="maintitle__logo-pc pc-only">
        <Webp src="logo" alt="実況プレイみるサイト メインロゴ"/>
      </a>
  
    </header>
  );
}

export default MainTitle;