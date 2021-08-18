<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlannerPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planner_permissions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('owner_id')->unsigned();
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('calendar_id')->unsigned();
            $table->bigInteger('planner_id')->unsigned();
            $table->string('permission');
            $table->timestamps();
            $table->foreign('owner_id')->references('id')->on('users')->OnDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->OnDelete('cascade');
            $table->foreign('calendar_id')->references('id')->on('calendars')->OnDelete('cascade');
            $table->foreign('planner_id')->references('id')->on('planners')->OnDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planner_permissions');
    }
}
