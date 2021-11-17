<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commands', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('users_id');
            $table->unsignedBigInteger('tente_id');
            $table->boolean('statut');
            $table->integer('price');
            $table->dateTime('date');
            $table->foreign('users_id')->references('id')->on('users');
            $table->foreign('tente_id')->references('id')->on('tente');
            $table->foreign('product_id')->references('id')->on('products');
            $table->timestamps('false');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commands');
    }
}
