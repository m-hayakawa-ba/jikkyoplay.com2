import React from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';

function HomeIndex() {
  return (
    <>
      　　　　　　　　　　　　　　　　　　　　　　　　　　home<br />
      　　　　　　　　　　　　　　　　　　　　　　　　　　<Link to="/news">news一覧へ</Link>
    </>
  );
}

export default HomeIndex;