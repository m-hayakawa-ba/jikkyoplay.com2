<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\ProgramService;
use App\Services\ReviewService;

class ApiProgramController extends Controller
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
     * 動画の詳細ページを表示
     */
    public function Show(Request $request)
    {
        //動画モデルを取得
        $program = $this->programService->getProgramById($request->program_id ?? 0);

        //レビューモデルを取得
        $reviews = $this->reviewService->getReviewsByProgramId($request->program_id ?? 0);

        //関連動画モデルを取得
        $relations = $this->programService->getRelationProgramsById($request->program_id ?? 0);

        //取得した動画を渡す
        return response()->json(compact('program', 'reviews', 'relations'), 200);
    }
}
