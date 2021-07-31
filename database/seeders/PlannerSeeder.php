<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlannerSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table('planners')->insert([
      [
        'title' => 'Soft Skills',
        'calendar_id' => 2,
        'bg_color' => 'green',
        'color' => 'white',
        'icon' => 'fa fa-users'
      ],
      [
        'title' => 'Medical Knowledge',
        'calendar_id' => 3,
        'bg_color' => 'royalblue',
        'color' => 'white',
        'icon' => 'fa fa-user-md'
      ],
      [
        'title' => 'Ferrotron Training',
        'calendar_id' => 3,
        'bg_color' => 'lightblue',
        'color' => 'black',
        'icon' => 'fa fa-user-md'
      ],
      [
        'title' => 'System Version2',
        'calendar_id' => 1,
        'bg_color' => 'green',
        'color' => 'white',
        'icon' => 'fa fa-code'
      ],
    ]);
  }
}
