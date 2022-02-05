/**
 * トップページや検索結果画面に表示させる動画一覧
 * 
 * @param program 表示させる動画の情報
 * @param backgournd_color_pc PC版の背景の色 'white' または 'black' のみ
 * @param backgournd_color_sp スマホ版の背景の色 'white' または 'black' のみ
 */

import React from 'react';
import {Link} from 'react-router-dom';

const ProgramList = (props) => {

  //変数を保存
  let program = props.program;
  let background_class = '';
  
  //背景の色を決定
  if (props.backgournd_color_pc == 'white') {
    if (props.backgournd_color_sp == 'white') {
      background_class = 'bg_sp_w_pc_w';
    } else {
      background_class = 'bg_sp_b_pc_w';
    }
  } else {
    if (props.backgournd_color_sp == 'white') {
      background_class = 'bg_sp_w_pc_b';
    } else {
      background_class = 'bg_sp_b_pc_b';
    }
  }

  //出力
  return (
     <Link to={"/program/" + program.id} className={ "main-program " + background_class }>

        {/* 動画タイトル */}
        <div className="main-caption__title pc-only">
          { program.title }
        </div>
        {/* 動画サムネイル */}
        <div className="main-program__sizing-thumb">
          <img src={ program.image_url } loading="lazy" alt={ program.title } />
        </div>
        {/* 動画説明部分 */}
        <div className="main-program__sizing-caption">
          <div className="main-program__sizing-inner" style={{display: "table", tableLayout:" fixed"}}>
            <div className="main-caption">
  
              {/* 動画タイトル */}
              <div className="main-caption__title sp-only">
                { program.title }
              </div>
  
              {/* チャンネル情報 */}
              <div className="main-caption__creater">
                <img src={ program.creater_user_icon_url } loading="lazy" className="main-caption__creater__icon" />
                <div style={{marginLeft: '4px'}}>
                  <div className="main-caption__creater__name">{ program.creater_name }</div>
                  <div className="main-caption__date">{ program.published_date } 投稿</div>
                  <div className="main-caption__view">{ program.view_count }回 再生</div>
                </div>
              </div>
                
            </div>
          </div>
        </div>
  
     </Link>
  );
}

export default ProgramList;