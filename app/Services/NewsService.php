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
        return $this->newsModel
            ->select(['id', 'title', 'author', 'url', 'published_at'])
            ->where('flag_enabled', 1)
            ->orderBy('published_at', 'desc')
            ->orderBy('id', 'desc')
            ->paginate(self::PAGINATE_LIMIT);
    }
}