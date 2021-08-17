<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CalendarSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('calendars')->insert([
      [
        'title' => 'CRM',
        'user_id' => 1,
      ],
      [
        'title' => 'Training',
        'user_id' => 2
      ],
      [
        'title' => 'Marketing',
        'user_id' => 2
      ],
    ]);
  }
}
