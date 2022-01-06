/**
 * パンくずリスト
 * 
 * @param
 */

 import React from 'react';
 import {Link} from 'react-router-dom';

 import Webp from '@/user/utility/Webp';

 const BreadCrumb = (props) => {
   return (
     <div className="breadcrumbs">
        <div className="breadcrumbs__list">
          <Link to="/">
            <Webp src="logo_jikkyoplay"/>
            トップページ
          </Link>
          <br className="sp-br" />
          <span className="breadcrumbs__here">
              
          </span>
        </div>
     </div>
   );
 }
 
 export default BreadCrumb;