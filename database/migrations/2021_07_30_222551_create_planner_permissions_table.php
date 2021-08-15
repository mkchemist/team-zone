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
      $table->bigInteger('planner_id')->unsigned();
      $table->boolean('can_read')->default(false);
      $table->boolean('can_create')->default(false);
      $table->boolean('can_edit')->default(false);
      $table->boolean('can_delete')->default(false);
      $table->boolean('can_restore')->default(false);
      $table->timestamps();
      $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
      $table->foreign('planner_id')->references('id')->on('planners')->onDelete('cascade');
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
