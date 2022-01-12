<?php

namespace App\Services;

use App\Models\Program;

final class ProgramService
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private Program $programModel,
    ) {
    }

    /**
     * 動画idから動画の詳細情報を取得
     * 
     * @return int $id 動画id
     * @return Program 動画モデル
     */
    public function getProgramById(int $id) :?Program
    {
        //動画情報を取得
        $program =  $this->programModel
            ->where('id', '=', $id)
            ->where('flag_enabled', '=', 1)
            ->first();

        //動画情報を返して終了
        return $program;
    }
}