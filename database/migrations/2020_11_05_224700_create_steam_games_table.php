<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSteamGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('steam_games', function (Blueprint $table) {
            $table->increments('id')->index();
            $table->integer('steam_id')->index();
            $table->string('type')->nullable();
            $table->string('list_name');
            $table->string('app_name')->nullable();
            $table->string('maker')->nullable();
            $table->string('releace_date')->nullable();
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
        Schema::dropIfExists('steam_games');
    }
}
