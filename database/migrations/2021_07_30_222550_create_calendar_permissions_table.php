<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCalendarPermissionsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('calendar_permissions', function (Blueprint $table) {
      $table->id();
      $table->bigInteger('owner_id')->unsigned();
      $table->bigInteger('user_id')->unsigned();
      $table->bigInteger('calendar_id')->unsigned();
      $table->boolean('can_read')->default(false);
      $table->boolean('can_create')->default(false);
      $table->boolean('can_edit')->default(false);
      $table->boolean('can_delete')->default(false);
      $table->boolean('can_restore')->default(false);
      $table->timestamps();
      $table->foreign('owner_id')->references('id')->on('users')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
      $table->foreign('calendar_id')->references('id')->on('calendars')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('calendar_permissions');
  }
}
