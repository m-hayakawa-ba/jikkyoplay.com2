<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\NewsService;
use App\Services\ThumbnailService;

class ApiMainController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private NewsService $newsService,
        private ThumbnailService $thumbnailService,
    ) {
    }

    public function index()
    {
        //メインタイトルのサムネイルを取得
        $thumbnails = $this->thumbnailService->getTitleThumbnail();

        //トップページに表示させるニュースを取得
        $newses = $this->newsService->getNewsesTop();

        //取得したデータをJSONで返す
        return response()->json(compact('thumbnails', 'newses'), 200);
    }
}
