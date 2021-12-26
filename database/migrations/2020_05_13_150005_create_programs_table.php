<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgramsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->integer('site_id')->comment('1 YouTube 2 ニコニコ動画');
            $table->integer('view_count');
            $table->string('image_url');
            $table->string('movie_id')->nullable()->index();
            $table->integer('creater_id')->unsigned();
            $table->integer('game_id')->unsigned();
            $table->integer('voice_id')->unsigned();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        //外部キー制約
        Schema::table('programs', function($table) {
            $table->foreign('creater_id')->references('id')->on('creaters')->onDelete('restrict');
            $table->foreign('game_id')   ->references('id')->on('games')   ->onDelete('restrict');
            $table->foreign('voice_id')  ->references('id')->on('voices')  ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('programs');
    }
}
