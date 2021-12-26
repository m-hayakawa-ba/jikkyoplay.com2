<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreatersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('creaters', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('user_id')->nullable()->comment('YouTubeチャンネルID または ニコニコ動画ユーザーID');
            $table->string('user_icon_url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('creaters');
    }
}
