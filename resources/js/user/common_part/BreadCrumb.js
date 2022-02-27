/**
 * パンくずリスト
 * 
 * @param links [page_name, page_url] ページ名とURLの配列を渡す
 */

 import React from 'react';
 import {Link} from 'react-router-dom';

 import Webp from '@/user/utility/Webp';

 const BreadCrumb = (props) => {
   return (
     <div className="breadcrumbs">
        <div className="breadcrumbs__list">

          {/* トップページは必ず表記 */}
          <Link to="/">
            <Webp src="logo_jikkyoplay"/>
            <span className="breadcrumbs__item">
              &nbsp;トップページ
            </span>
          </Link>

          {/* 2階層目以降 */}
          <br className="sp-br"/>
          {props.links && props.links.map((link, index) => (
            <span key={index} className="breadcrumbs__item">
              {
                link.page_url == ''
                  ? <span>&nbsp;＞&nbsp;{link.page_name}</span>
                  : <Link to={link.page_url}>&nbsp;＞&nbsp;{link.page_name}</Link>
              }
            </span>
          ))}

        </div>
     </div>
   );
 }
 
 export default BreadCrumb;