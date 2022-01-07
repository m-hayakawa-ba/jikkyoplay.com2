import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";

const SearchBox = () => {

  //検索時のページ移動用
  let history = useHistory();
    
  //検索フォームの制御用
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    history.push('/search?word=' + data.word + '&mode=' + data.mode);
  }

  //ただ単に検索窓の虫眼鏡マークを表示させるだけ
  function unescapeHTML(html) {
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
  }

  return (
    <div className="easysearch">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="word" placeholder="気になるゲーム・投稿者名で検索！" {...register("word")} />
        <input type="hidden" name="mode" value="normal" {...register("mode")}/>
        <input type="submit" value={unescapeHTML('&#xe90d')} className="standard_button btn_purple easysearch__submit" />
      </form>
    </div>
  );

}

export default SearchBox;