<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\NewsService;

class UserNewsController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private NewsService $newsService,
    ) {
    }

    /**
     * 一覧表示
     */
    public function index()
    {
        $newss = $this->newsService->getNewss();
        return response()->json($newss, 20);
    }
}
