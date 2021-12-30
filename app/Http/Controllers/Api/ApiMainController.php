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
        $newses = $this->newsService->getNewsesTop();
        return response()->json($newses, 200);
    }
}
