<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\ThumbnailService;

class WebUserController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private ThumbnailService $thumbnailService,
    ) {
    }

    /**
     * 全ページ共通呼び出しのcontroller
     */
    public function user()
    {
        //メインタイトルのサムネイルを取得
        $thumbnails = $this->thumbnailService->getTitleThumbnail();
        
        //データを返して終了
        return view('user', compact('thumbnails'));
    }
}
