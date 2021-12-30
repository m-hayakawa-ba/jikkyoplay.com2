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
     * すべてのニュース一覧を取得する
     */
    public function getNewss()
    {
        return $this->newsModel->all();
    }
}