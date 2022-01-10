<?php

namespace App\Services;

use App\Models\News;

final class NewsService
{
    //定数
    const TOPPAGE_LIMIT = 4;
    const PAGINATE_LIMIT = 10;

    /**
     * キャスト
     */
    protected $casts = [
        'published_at' => 'datetime',
    ];

    /**
     * コンストラクタ
     */
    public function __construct(
        private News $newsModel,
    ) {
    }

    /**
     * トップページに表示するニュースを取得する
     */
    public function getNewsesTop()
    {
        $newses = $this->newsModel
            ->select(['id', 'title', 'author', 'url', 'published_at'])
            ->where('flag_enabled', 1)
            ->orderBy('published_at', 'desc')
            ->orderBy('id', 'desc')
            ->limit(config('constants.LIMIT_NEWS_TOPPAGE'))
            ->get();
        
        //日付の表記を変換
        foreach($newses as &$news) {
            $news->published_date = $this->formatPublishedAt($news->published_at);
        }
    
        //データを返す
        return $newses;
    }

    /**
     * 一覧画面に表示するニュースを取得する
     */
    public function getNewsesIndex()
    {
        //DBからデータを取得
        $newses = $this->newsModel
            ->select(['id', 'title', 'author', 'url', 'published_at'])
            ->where('flag_enabled', 1)
            ->orderBy('published_at', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(config('constants.LIMIT_NEWS_PAGINATE'));
        
        //日付の表記を変換
        foreach($newses as &$news) {
            $news->published_date = $this->formatPublishedAt($news->published_at);
        }

        //データを返す
        return $newses;
    }


    /**
     * published_atの表記を整形
     * 
     * @param stirng published_at Y-m-d H:i:s 形式の日時
     */
    private function formatPublishedAt(string $published_at)
    {
        return \DateTime::createFromFormat('Y-m-d H:i:s', $published_at)->format('Y年n月j日');
    }
}