<?php

namespace App\Services;

use App\Models\News;

/**
 * Class StaffService
 * @package App\Services\Home
 */
final class NewsService
{
    private $authorityModel;

    /**
     * コンストラクタ
     */
    public function __construct(
        private News $newsModel,
    ) {
    }

    /**
     * トップページに表示するニュースを取得する
     * @param intger $limit 取得するニュースの最大件数
     */
    public function getNewsesTop(int $limit)
    {
        return $this->newsModel
            ->select(['id', 'title', 'author', 'url', 'published_at'])
            ->orderBy('published_at', 'desc')
            ->orderBy('id', 'desc')
            ->limit($limit)
            ->get();
    }

    /**
     * すべてのニュース一覧を取得する
     */
    public function getNewses()
    {
        return $this->newsModel
            ->select(['id', 'title', 'author', 'url', 'published_at'])
            ->orderBy('published_at', 'desc')
            ->orderBy('id', 'desc')
            ->get();
    }
}