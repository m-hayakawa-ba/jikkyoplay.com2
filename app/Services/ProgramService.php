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
            ->select(
                'programs.id',
                'programs.title',
                'programs.site_id',
                'programs.view_count',
                'programs.movie_id',
                'programs.creater_id',
                'programs.game_id',
                'programs.voice_id',
                'programs.published_at',
                'voices.type as voice_type',
                'games.name as game_name',
                'games.releace_year as game_releace_year',
                'creaters.id as creater_id',
                'creaters.name as creater_name',
                'creaters.user_id as creater_user_id',
                'creaters.user_icon_url as creater_user_icon_url',
                'hards.id as hard_id',
                'hards.name as hard_name',
                'makers.id as maker_id',
                'makers.name as maker_name',
            )
            ->join('voices', 'programs.voice_id', '=', 'voices.id')
            ->join('games', 'programs.game_id', '=', 'games.id')
            ->join('creaters', 'programs.creater_id', '=', 'creaters.id')
            ->join('hards', 'games.hard_id', '=', 'hards.id')
            ->join('makers', 'games.maker_id', '=', 'makers.id')
            ->where('programs.id', '=', $id)
            ->where('programs.flag_enabled', '=', 1)
            ->first();

        //変数のフォーマット変換
        $program->published_date = $this->formatPublishedAt($program->published_at);
        $program->movie_url = $this->getMovieSiteUrl($program->site_id, $program->movie_id);
        $program->site_name = $this->getMovieSiteName($program->site_id);
        $program->channel_url = $this->getChannelUrl($program->site_id, $program->creater_user_id);

        //動画情報を返して終了
        return $program;
    }

    /**
     * published_atの表記を整形
     * 
     * @param stirng published_at Y-m-d H:i:s 形式の日時
     * 
     * @return string Y年n月j日形式に変換された日時
     */
    private function formatPublishedAt(string $published_at)
    {
        return \DateTime::createFromFormat('Y-m-d H:i:s', $published_at)->format('Y年n月j日');
    }

    /**
     * リンク先のURLを作成する
     * 
     * @param int site_id 動画サイトid
     * @param string movie_id 動画id
     * 
     * @return string 動画サイトの動画url
     */
    private function getMovieSiteUrl(int $site_id, string $movie_id)
    {
        switch($site_id) {
            case config('constants.SITE_ID_YOUTUBE'):  return "https://www.youtube.com/watch?v=$movie_id";
            case config('constants.SITE_ID_NICONICO'): return "https://www.nicovideo.jp/watch/$movie_id";
        }
    }

    /**
     * その動画の動画サイト名を返す
     * 
     * @param int site_id 動画サイトid
     * 
     * @return string 動画サイト名
     */
    private function getMovieSiteName(int $site_id)
    {
        switch($site_id) {
            case config('constants.SITE_ID_YOUTUBE'):  return config('constants.SITE_NAME_YOUTUBE');
            case config('constants.SITE_ID_NICONICO'): return config('constants.SITE_NAME_NICONICO');
        }
    }

    /**
     * その投稿者のチャンネルURLを返す
     * 
     * @param int site_id 動画サイトid
     * @param string user_id 投稿者のユーザーid
     * 
     * @return string チャンネルURL
     */
    private function getChannelUrl(int $site_id, string $user_id)
    {
        switch($site_id) {
            case config('constants.SITE_ID_YOUTUBE'):  return "https://www.youtube.com/channel/{$user_id}";
            case config('constants.SITE_ID_NICONICO'): return "https://www.nicovideo.jp/user/{$user_id}";
        }
    }
}