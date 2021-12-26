<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('hard_id')->unsigned();
            $table->integer('maker_id')->unsigned();
            $table->integer('releace_year');
            $table->timestamps();
        });

        //外部キー制約
        Schema::table('games', function($table) {
            $table->foreign('hard_id') ->references('id')->on('hards') ->onDelete('restrict');
            $table->foreign('maker_id')->references('id')->on('makers')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('games');
    }
}
