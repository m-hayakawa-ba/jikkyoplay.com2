<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\SearchService;

class ApiSearchController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private SearchService $searchService,
    ) {
    }

    /**
     * 一覧表示
     */
    public function index(Request $request)
    {
        $programs = $this->searchService->searchProgramsEasily($request->word ?? '');
        return response()->json($programs, 200);
    }
}
