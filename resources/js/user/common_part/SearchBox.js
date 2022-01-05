
import React from 'react';

import Webp from '@/user/utility/Webp';

const SearchBox = () => {

  return (
    <div id="js_menu" class="easysearch">
      <form action="/result" method="get">
        <input type="text" name="word" placeholder="気になるゲーム・投稿者名で検索！" />
        <input type="hidden" name="mode" value="normal" />
        <input type="submit" value="&#xe90d" class="standard_button btn_purple easysearch__submit" />
      </form>
    </div>
  );

}

export default SearchBox;