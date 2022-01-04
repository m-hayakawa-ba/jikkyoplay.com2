<?php

namespace App\Services;

use App\Models\Program;

final class ThumbnailService
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private Program $programModel,
    ) {
    }

    /**
     * メインタイトルのサムネイルリストを取得
     * 
     * @return array サムネイルのURLの配列
     */
    public function getTitleThumbnail() :array
    {
        //キャッシュからリストを取得
        $thumbnails = \Cache::remember('titleThumbnail', '1440', function(){
            return Program::select('image_url')
                ->limit(10)
                ->orderBy('published_at','desc')
                ->get()->toArray();
        });
        
        //サムネイルのリストを返す
        return $thumbnails;
    }
}