<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFixProgramInfomationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fix_program_infomations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('program_id')->unsigned();
            
            $table->integer('old_game_id')->unsigned();
            $table->integer('old_voice_id')->unsigned();
            $table->integer('new_game_id')->unsigned();
            $table->integer('new_voice_id')->unsigned();
            $table->string('ip_address');

            $table->timestamps();
        });

        //外部キー制約
        Schema::table('fix_program_infomations', function($table) {
            $table->foreign('program_id') ->references('id')->on('programs') ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fix_program_infomations');
    }
}
