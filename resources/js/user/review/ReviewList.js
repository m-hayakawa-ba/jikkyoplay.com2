/**
 * 動画や投稿者の情報つきでレビューを表示させる
 * 
 * @param review 表示させるレビューの情報
 */

import React from 'react';
import {Link} from 'react-router-dom';

import Webp from '@/user/utility/Webp';

const ReviewList = (props) => {

  //変数を保存
  let review = props.review;

  //出力
  return (
    <div className="review__wrap">

      {/* sp版動画タイトル */}
      <h2 className="sp-only">
        <Link to={ '/program/' + review.program_id }>{ review.title }</Link>
      </h2>
    
      <div className="review__wrap__2">
    
        {/* 動画サムネイル */}
        <Link to={ '/program/' + review.program_id } className="review__wrap__sizing-thumb">
          <div className="main-program__sizing-inner review__wrap__thumbnail" style={{ backgroundImage: 'url(' + review.image_url + ')' }}>
          </div>
        </Link>
    
        {/* 補足情報 */}
        <div className="review__wrap__caption">
          <div>
            <img src={ review.user_icon_url } className="lazyload" />
          </div>
          <div>
            <p>{ review.name }</p>
            <p className="pc-only">{ review.published_at_formatted } 投稿</p>
            <p className="pc-only">{ review.view_count } 回視聴</p>
          </div>
          <div className="sp-table-row review__wrap__caption__p"><p>{ review.published_at_short } 投稿</p></div>
          <div className="sp-table-row review__wrap__caption__p"><p>{ review.view_count } 回視聴</p></div>
        </div>
    
      </div>
    
      {/* レビュー本文 */}
      <div className="review__wrap__review">
    
        {/* 動画タイトルと再生日時 */}
        <h2 className="pc-only"><Link to={ '/program/' + review.program_id }>{ review.title }</Link></h2>
        
        {/* レビュー本文 */}
        <div className="review__wrap__review__detail" dangerouslySetInnerHTML={{ __html: review.detail }}>
        </div>
    
      </div>
    
    </div>
  );
}

export default ReviewList;