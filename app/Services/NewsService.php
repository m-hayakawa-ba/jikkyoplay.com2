<?php

namespace App\Services;

use App\Models\News;

/**
 * Class StaffService
 * @package App\Services\Home
 */
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
        return $this->newsModel
            ->select(['id', 'title', 'author', 'url', 'published_at'])
            ->where('flag_enabled', 1)
            ->orderBy('published_at', 'desc')
            ->orderBy('id', 'desc')
            ->limit(self::TOPPAGE_LIMIT)
            ->get();
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
            ->paginate(self::PAGINATE_LIMIT);
        
        //日付の表記を変換
        foreach($newses as &$news) {
            $news->published_date = \DateTime::createFromFormat('Y-m-d H:i:s', $news->published_at)->format('Y年n月j日');
        }

        //データを返す
        return $newses;
    }
}