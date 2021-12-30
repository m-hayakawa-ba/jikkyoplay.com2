import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

function NewsIndex() {
  return (
    <>
      　　　　　　　　　　　　　　　　　　　　　　　　　　newsです<br />
      　　　　　　　　　　　　　　　　　　　　　　　　　　<Link to="/">トップページへ戻る</Link>
    </>
  );
}

export default NewsIndex;