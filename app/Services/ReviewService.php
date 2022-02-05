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