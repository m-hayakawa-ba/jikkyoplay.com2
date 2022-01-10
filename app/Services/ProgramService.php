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
            
        //動画の埋め込みコードを作成
        if ($program) {
            switch ($program->site_id) {
                case config('constants.SITE_ID_YOUTUBE'):
                    $program->embed_code = "<iframe width='720' height='480' src='https://www.youtube.com/embed/{$program->movie_id}' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
                    break;
                case config('constants.SITE_ID_NICONICO'):
                    $program->embed_code = "<script type='application/javascript' src='https://embed.nicovideo.jp/watch/{$program->movie_id}/script?w=720&h=480'></script><noscript><a href='https://www.nicovideo.jp/watch/$program->movie_id'></a></noscript>";
                    break;
            }
        }

        //動画情報を返して終了
        return $program;
    }
}