<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\NewsService;

class ApiMainController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private NewsService $newsService,
    ) {
    }

    public function index()
    {
        //トップページに表示させるニュースを取得
        $newses = $this->newsService->getNewsesTop();

        //取得したデータをJSONで返す
        return response()->json(compact('newses'), 200);
    }
}
