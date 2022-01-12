<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use App\Models\Program;

final class SearchService
{
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
        //DBからデータを取得
        // $programs = $this->programModel
        //     ->select(
        //         'programs.id',
        //         'programs.title',
        //         'programs.image_url',
        //         'programs.view_count',
        //         'programs.published_at',
        //         'creaters.user_icon_url',
        //         'creaters.name as creater_name',
        //         DB::raw('DATE(published_at) as published_date'))
        //     ->join('creaters', 'programs.creater_id', '=', 'creaters.id')
        //     ->orderBy('published_date', 'desc')
        //     ->orderBy('programs.view_count', 'desc')
        //     ->limit(config('constants.LIMIT_PROGRAM_TOPPAGE'))
        //     ->get();

        $programs = $this->programModel
            ->select(
                'programs.id',
                'programs.title',
                'programs.image_url',
                'programs.view_count',
                'programs.published_at',
                'creaters.user_icon_url',
                'creaters.name as creater_name')
            ->join('creaters', 'programs.creater_id', '=', 'creaters.id')
            ->orderBy('published_at', 'desc')
            ->limit(config('constants.LIMIT_PROGRAM_TOPPAGE'))
            ->get();
        
        //日付の表記を変換
        foreach($programs as &$program) {
            $program->published_date = $this->formatPublishedAt($program->published_at);
        }

        //データを返す
        return $programs;
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
        return $query->paginate(config('constants.LIMIT_PROGRAM_SEARCH'));
    }


    /**
     * published_atの表記を整形
     * 
     * @param stirng published_at Y-m-d H:i:s 形式の日時
     */
    private function formatPublishedAt(string $published_at)
    {
        return \DateTime::createFromFormat('Y-m-d H:i:s', $published_at)->format('Y/n/j');
    }

}