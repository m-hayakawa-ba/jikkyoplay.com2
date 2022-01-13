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
            &nbsp;トップページ
          </Link>

          {/* 2階層目以降 */}
          <br className="sp-br"/>
          <span className="breadcrumbs__here">
            {props.links && props.links.map((link) => (
              <>
                {
                  link.page_url == ''
                    ? <>&nbsp;＞&nbsp;{link.page_name}</>
                    : <Link to={link.page_url}>&nbsp;＞&nbsp;{link.page_name}</Link>
                }
              </>
            ))}
          </span>

        </div>
     </div>
   );
 }
 
 export default BreadCrumb;