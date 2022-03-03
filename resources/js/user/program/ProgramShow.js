import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import axios from 'axios';

import BreadCrumb from '@/user/common_part/BreadCrumb';
import SearchBox from '@/user/common_part/SearchBox';
import ProgramList from '@/user/program/ProgramList';

let reload_embed = false;

function ProgramShow(props) {

  //newsの状態を管理する
  let [program, setProgram] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [relations, setRelations] = useState([]);

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
    getProgram(props.match.params.program_id);
    reload_embed = true;
  }, [props.match.params.program_id]) //別の動画を読み込むときだけ再読込させる

  //DBから動画の一覧情報を取得する
  const getProgram = (program_id) => {
    axios
      .get('/api/program/' + program_id)
      .then(response => {
        setProgram(response.data.program);
        setReviews(response.data.reviews);
        setRelations(response.data.relations);
      })
      .catch(() => {
        console.log('通信に失敗しました');
      });
  }

  //動画を埋め込む
  if (program.site_id && reload_embed) {

    //youtube動画の埋め込み処理
    if (program.site_id == constants['SITE_ID_YOUTUBE']) {
      iframe = document.createElement('iframe');
      iframe.setAttribute('src', 'https://www.youtube-nocookie.com/embed/' + program.movie_id);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      target = document.getElementById('js-program-embed');
      target.appendChild(iframe);
      reload_embed = false;
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

      {/* 検索ボックス */}
      <div style={{height: '8px'}}></div>
      <SearchBox />

      <main className="main-content program" style={{paddingTop: 0}}>

        {/* 埋め込み動画 */}
        <div id="js-program-embed" className="program__embed"></div>

        {/* 動画基本情報 */}
        <div className="program__container">
        
          {/* 投稿日と再生数 */}
          <div className="program__container__date">
            {program.published_date} 投稿
            ( {program.view_count}回 再生 )
          </div>
        
          {/* 動画タイトル */}
          <h1 target="blank" className="program__container__title">
            {program.title}
          </h1>
        
          {/* 投稿元サイトで見るボタン */}
          {
            program.site_id == constants['SITE_ID_YOUTUBE']
              ?
                <a href={program.movie_url} target="blank" className="btn_red standard_button program__container__site">
                  You Tube で見る <span className="icon-external-link-alt"></span>
                </a>
              :
                <a href={program.movie_url} target="blank" className="btn_blue standard_button program__container__site">
                  ニコニコ動画 で見る <span className="icon-external-link-alt"></span>
                </a>
          }
    
          {/* 付随情報 */}
          <div className="program__info">
        
            {/* 動画情報 */}
            <table><tbody>
              <tr>
                <th colSpan="2">動画情報</th>
              </tr>
              <tr>
                <td className="program__info__tdleft ">動画サイト&nbsp;：&nbsp;</td>
                <td className="program__info__tdright">
                  <Link to={ "/result?mode=advance&site_id=" + program.site_id } className="text-link-black">{ program.site_name }</Link>
                </td>
              </tr>
              <tr>
                <td className="program__info__tdleft ">声&nbsp;：&nbsp;</td>
                <td className="program__info__tdright">
                  <Link to={ "/result?mode=advance&voice_id=" + program.voice_id } className="text-link-black">{ program.voice_type }</Link>
                </td>
              </tr>
              <tr>
                <td className="program__info__tdleft ">ゲーム名&nbsp;：&nbsp;</td>
                <td className="program__info__tdright">
                  <Link to={ "/result?mode=advance&title_pfct=" + program.game_name } className="text-link-black">{ program.game_name }</Link>
                </td>
              </tr>
              <tr>
                <td className="program__info__tdleft ">ハード&nbsp;：&nbsp;</td>
                <td className="program__info__tdright">
                  <Link to={ "/result?mode=advance&hard_id=" + program.hard_id } className="text-link-black">{ program.hard_name }</Link>
                </td>
              </tr>
              <tr>
                <td className="program__info__tdleft ">メーカー&nbsp;：&nbsp;</td>
                <td className="program__info__tdright">
                  <Link to={ "/result?mode=advance&maker_id=" + program.maker_id } className="text-link-black">{ program.maker_name }</Link>
                </td>
              </tr>
              <tr>
                <td className="program__info__tdleft ">発売年&nbsp;：&nbsp;</td>
                <td className="program__info__tdright">
                  <Link to={ "/result?mode=advance&year=" + program.game_releace_year } className="text-link-black">{ program.game_releace_year }年</Link>
                </td>
              </tr>
              <tr>
                <td className="program__info__tdleft "></td>
                <td className="program__info__tdright program__info__edit">
                  <span id="js-edit-button-open">情報を修正する&nbsp;<span className="icon-edit"></span></span>
                </td>
              </tr>
            </tbody></table>
                
            {/* チャンネル情報 */}
            <table><tbody>
              <tr>
                <th rowSpan="3" className="program__info__channel-icon" style={{ backgroundImage: 'url( ' + program.creater_user_icon_url + ' )' }}></th>
                <th>{ program.creater_name }</th>
              </tr>
              <tr>
                <td className="program__info__tdright">
                  <Link to={ "/result?mode=advance&creater_id=" + program.channel_url }>この実況者の他の動画を見る</Link>
                </td>
              </tr>
              <tr>
                <td className="program__info__tdright">
                  <a href={ program.channel_url } target="blank">チャンネルページへ行く <span className="icon-external-link-alt"></span></a>
                </td>
              </tr>
              </tbody></table>
        
          </div>
    
        </div>
    
        {/* 動画レビュー */}
        <h2>レビュー</h2>
        {reviews.length
          ? reviews.map((review, index) => (
            <div className="program__review__wrapper" key={index}>
              <div className="program__review__detail" dangerouslySetInnerHTML={{ __html: review.detail }}></div>
              <div className="program__review__reviewer">reviewer：{ review.reviewer }</div>
            </div>
          ))

          //reviewsが空配列のとき
          : <div className="program__review__noreview">
              この動画のレビューはまだありません。<br />
              レビューを書いて { program.creater_name } さんを応援しよう！
            </div>
        }
  
        {/* レビューを書く */}
        <Link to={"/review/create/" + program.id} className="program__more-button standard_button btn_blue">
          この動画のレビューを書く
        </Link>

        {/* 関連動画 */}
        {relations
          ? relations.length
          ? <h2>関連動画</h2>  //relationsが空配列でない配列が入っているとき
          : <></>              //relationsが空配列のとき
          : <></>              //relationsが定義されていないとき
        }
        <div className="program__relation">
          {relations && relations.map((relation, index) => (
            <ProgramList
              program={ relation }
              backgournd_color_pc={ index%2 ? 'white' : 'black' }
              backgournd_color_sp={ index%2 ? 'white' : 'black' }
              key={index}
            />
          ))}
        </div>
        {relations.length >= 4 &&
          <Link to={"/result?mode=advance&creater_id=" + program.creater_id } className="program__more-button standard_button btn_blue">
            もっと見る
          </Link>
        }

        {/* 戻るボタン */}
        <div className="program_footer">
          <Link to="/" className="standard_button btn_purple program__return">
            戻る
          </Link>
        </div>

      </main>

    </>
  );
}

export default ProgramShow;