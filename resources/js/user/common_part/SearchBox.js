
import React from 'react';

import Webp from '@/user/utility/Webp';

const SearchBox = () => {

  function unescapeHTML(html) {
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
  }

  return (
    <div id="js_menu" className="easysearch">
      <form action="/result" method="get">
        <input type="text" name="word" placeholder="気になるゲーム・投稿者名で検索！" />
        <input type="hidden" name="mode" value="normal" />
        <input type="submit" value={unescapeHTML('&#xe90d')} className="standard_button btn_purple easysearch__submit" />
      </form>
    </div>
  );

}

export default SearchBox;