<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\ProgramService;
use App\Services\ReviewService;

class ApiReviewController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private ProgramService $programService,
        private ReviewService $reviewService,
    ) {
    }


    /**
     * レビューを作成する
     */
    public function create(Request $request)
    {
        //動画モデルを取得
        $program = $this->programService->getProgramById($request->program_id ?? 0);

        //取得した動画を渡す
        return response()->json(compact('program'), 200);
    }
}
