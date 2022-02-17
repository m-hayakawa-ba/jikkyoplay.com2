<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\SearchService;
use App\Services\NewsService;
use App\Services\ReviewService;

class ApiMainController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private SearchService $searchService,
        private NewsService $newsService,
        private ReviewService $reviewService,
    ) {
    }

    public function index()
    {
        //最新の番組を取得
        $programs = $this->searchService->searchProgramsTop();

        //トップページに表示させるニュースを取得
        $newses = $this->newsService->getNewsesTop();

        //トップページに表示させるレビューを取得
        $review = $this->reviewService->getLatestReview();

        //取得したデータをJSONで返す
        return response()->json(compact('programs', 'newses', 'review'), 200);
    }
}
