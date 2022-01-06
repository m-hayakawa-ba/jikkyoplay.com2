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
     * @return string サムネイルのURLの配列をjsonにしたもの
     */
    public function getTitleThumbnail() :string
    {
        //キャッシュからリストを取得
        $thumbnails = \Cache::remember('titleThumbnail', '1440', function(){
            return Program::select('image_url')
                ->limit(10)
                ->orderBy('published_at','desc')
                ->get()
                ->toJson(JSON_UNESCAPED_UNICODE);
        });

        $thumbnails = Program::select('image_url')
            ->limit(10)
            ->orderBy('published_at','desc')
            ->get()
            ->toJson(JSON_UNESCAPED_UNICODE);
        
        //サムネイルのリストを返す
        return $thumbnails;
    }
}