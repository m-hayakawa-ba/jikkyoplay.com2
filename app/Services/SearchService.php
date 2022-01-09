<?php

namespace App\Services;

use App\Models\Program;

final class SearchService
{
    //定数
    const TOPPAGE_LIMIT = 8;
    const PAGINATE_LIMIT = 24;

    /**
     * コンストラクタ
     */
    public function __construct(
        private Program $programModel,
    ) {
    }


    /**
     * トップページに表示される新着動画
     * 過去2日以内の動画の中から再生数の多いものを抜き出す
     */
    public function searchProgramsTop()
    {
        $query = $this->programModel
            ->select(
                'programs.id',
                'programs.title',
                \DB::raw('DATE(published_at) as published_date'))
            ->join('creaters', 'programs.creater_id', '=', 'creaters.id')
            ->orderBy('published_date', 'desc')
            ->orderBy('programs.view_count')
            ->limit(self::TOPPAGE_LIMIT);

        return $query->get();
    }

    /**
     * 文字列から簡易検索を行う
     * 
     * @param string $sentence 検索用ワードが連結されたもの
     */
    public function searchProgramsEasily(string $sentence)
    {
        //全角スペースを半角スペースに変換、検索文字列で区切る
        $words = explode(' ', (string)str_replace('　', ' ', $sentence));

        //投稿者テーブルをjoinする
        $query = $this->programModel
            ->select(
                'programs.id',
                'programs.title'
            )
            ->join('creaters', 'programs.creater_id', '=', 'creaters.id')
            ->where('programs.flag_enabled', true);

        //検索ワードでアンド検索する
        foreach($words as $word) {
            $query = $query->where(function($q) use($word){
                $q->Where('programs.title', 'LIKE', "%$word%")
                    ->orWhere('creaters.name',  'LIKE', "%$word%");
            });
        }

        //検索結果を返す
        return $query->paginate(self::PAGINATE_LIMIT);
    }

}