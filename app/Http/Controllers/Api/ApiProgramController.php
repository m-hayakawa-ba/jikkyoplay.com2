<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\ProgramService;

class ApiProgramController extends Controller
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private ProgramService $programService,
    ) {
    }


    /**
     * 動画の詳細ページを表示
     */
    public function Show(Request $request)
    {
        //動画モデルを取得
        $program = $this->programService->getProgramById($request->program_id ?? 0);

        //取得した動画を渡す
        return response()->json($program, 200);
    }
}
