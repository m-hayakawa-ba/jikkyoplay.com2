/**
 * ファイル名を渡すと、webp または png の画像を表示してくれる。
 * 同じ名前の webp と png の画像を image フォルダに入れておくこと
 * 
 * @param className クラス名
 * @param src       画像のファイル名　拡張子はいらない
 * @param alt       画像のaltタグ
 */

import React from 'react';

const Webp = (props) => {
  return (
    <picture>
      <source type="image/webp" className={ props.className } src={ "/image/" + (props.src) + ".webp" } alt={ props.alt} />
      <img className={ props.className } src={ "/image/" + (props.src) + ".png" } alt={ props.alt} />
    </picture>
  );
}

export default Webp;