<?php

namespace App\Services;

use App\Models\Review;

final class ReviewService
{
    /**
     * コンストラクタ
     */
    public function __construct(
        private Review $reviewModel,
    ) {
    }

    /**
     * トップページ用に最新のレビューを１件取得
     */
    public function getLatestReview() :?Review
    {
        //データを取得
        $review = $this->reviewModel
            ->select(
                'reviews.program_id', 
                'reviews.reviewer', 
                'reviews.detail', 
                'reviews.displayed_at', 
                'programs.title', 
                'programs.image_url', 
                'programs.published_at', 
                'programs.view_count', 
                'creaters.name', 
                'creaters.user_icon_url', 
            )
            ->join('programs', 'reviews.program_id', '=', 'programs.id')
            ->join('creaters', 'programs.creater_id', '=', 'creaters.id')
            ->where('reviews.flag_enabled', '=', 1)
            ->where('programs.flag_enabled', '=', 1)
            ->where('displayed_at', '<=', date("Y-m-d H:i:s"))
            ->orderBy('displayed_at', 'desc')
            ->first();
        
        //日付の形式を変更
        $review->published_at_formatted = \DateTime::createFromFormat('Y-m-d H:i:s', $review->published_at)->format('Y年n月j日');
        
        return $review;
    }

    /**
     * 動画idからその動画に紐づくレビューをすべて取得
     * 
     * @param int $program_id
     * @return array 紐づくレビューの配列
     */
    public function getReviewsByProgramId(int $program_id) :?array
    {
        $reviews = $this->reviewModel
            ->select(
                'reviews.reviewer',
                'reviews.detail',
                'reviews.displayed_at',
            )
            ->where('program_id', '=', $program_id)
            ->where('flag_enabled', '=', 1)
            ->get()
            ->toArray();

        return $reviews;
    }
}